const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/thanks', (req, res) =>{
        res.send('Thanks for voting!');
    });

    // Send Survey emails and do logic
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // Create Survey model instance
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
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

    // SendGrid webhook for email responses
    app.post('/api/surveys/webhooks', (req, res)=>{
        console.log(req.body);
        res.send({});
    });
};