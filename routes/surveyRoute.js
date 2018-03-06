const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    // Thanks message
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    // Send Survey emails and do logic
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body;

        // Create Survey model instance
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            // Save Survey model instance in DB
            await survey.save();
            // Subtract one credit from user
            req.user.credits -= 1;
            // Save User updated values in DB
            const user = await req.user.save();
            // Trigger re-rendering by sending user's updated profile through express to client side part of the app.
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    // SendGrid webhook for email response manipulation
    app.post('/api/surveys/webhooks', (req, res) => {
        //setup the path structure which contains the desired feedback on click
        const p = new Path('/api/surveys/:surveyId/:choice');
        // start lodash function chaining
        _.chain(req.body)
            .map(({email, url}) => {
                // the below creates (if any) an object which properties matches the p new Path structure above
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return {
                        email: email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact() // compact removes undefined entries
            .uniqBy('email', 'surveyId') // uniqBy removes duplicates
            // Below is the Mongoose model query for fetching the survey in which the
            .each(event => {
                Survey.updateOne({
                    _id: event.surveyId,
                    recipients: {
                        $elemMatch: {email: event.email, responded: false}
                    }
                }, {
                    $inc: {[event.choice]: 1},
                    $set: {'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec(); // prepares the query for execution
            })
            .value(); // return result
        // the below doesn't corresponds to a desired response (sendgrid doesn't care for any response)
        res.send({});

    });

};