const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const recipientSchema = new Schema({
    email: String,
    responded: {type: Boolean, default: false}
});
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: {type: Schema.Types.ObjectId, ref: 'user'},
    dateSent: Date,
    lastResponded: Date
});

module.exports = mongoose.model('survey', surveySchema);