const brevo = require('@getbrevo/brevo');

class Mailer extends brevo.SendSmtpEmail{
    constructor({subject, recipients}, content){
        super();
        this.subject=subject;
        this.sender={"email":"no-reply@gmail.com"};
        this.htmlContent=content;
        this.to=this.formatAddresses(recipients);
    }
    formatAddresses(recipients){
        return recipients.map(recipient=>{
            return {"email":recipient.email};
        });
    }
}
module.exports = Mailer;