const mailTracking = require('nodemailer-mail-tracking');
module.exports = (survey) => {
    return `
    <html>
    <body> 
    <div style="text-align:center">
    <h3>I'd like your input</h3>
    <p>Please answer the following question</p>
    <p>${survey.body}</p>
    <div>
    <a href="http://yes-link">Yes</a>
    <a href="http://no-link">No</a>
    </div>
    </div>
    </body>
    </html>
    `
}