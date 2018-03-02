
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

        this.addContent(this.body); // addContent comes from the Mail extension
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({email}) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        // The below code comes from the SendBox documentation
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // TODO - TO BE CONTINUED
    addRecipients() {

    }
}

module.exports = Mailer;