
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, mailContent) {
        super();
        // Initialize SendGrid service
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', mailContent);
        this.recipients = this.formatAddresses(recipients);
    }
}

module.exports = Mailer;