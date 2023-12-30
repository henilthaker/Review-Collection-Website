const express = require('express');
const requireLogin = require('../middlewares/requireLogin.js');
const checkCredits = require('../middlewares/checkCredits.js');
const mongoose = require('mongoose');
const router = express.Router();
const Survey = mongoose.model('survey');
const Mailer = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');
const keys = require('../config/keys.js');
const brevo = require('@getbrevo/brevo');
const nodemailer = require('nodemailer');
const { expressApp, sendMail } = require('nodemailer-mail-tracking');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: keys.gmailSmtpUser,
        pass: keys.gmailSmtpPassword,
    },
});

const mailTrackOptions = {
    baseUrl: 'http://localhost:5000/track-click',
    jwtSecret: 'secret',
    getData: data=>{
        return {...data};
    },
    onLinkClick: data => {
        console.log(data);
    }
}

// const apiInstance = new brevo.TransactionalEmailsApi();
// apiInstance.authentications['apiKey'].apiKey = keys.brevoKey;

router.post('/api/surveys', requireLogin, checkCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const created_survey = await Survey.create({
        title,
        body,
        subject,
        recipients: recipients.split(',').map((recipientEmail) => {
            return { email: recipientEmail.trim() }
        }),
        // .trim() is to remove any leading or trailing spaces
        _user: req.user.id,
        dateSent: Date.now()
    });

    try {
        created_survey.recipients.forEach(async (recipient)=>{
            const result = await sendMail(mailTrackOptions, transporter, {
                to: recipient.email,
                subject,
                html: surveyTemplate(created_survey)
            });
        })
        res.json('emails sent successfully');
    } catch (err) {
        res.json(err);
    }
});

router.use('/track-click',expressApp(mailTrackOptions));

module.exports = router;