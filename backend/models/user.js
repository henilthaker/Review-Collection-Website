const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const {Schema} = mongoose; // same as above statement.

const userSchema = new Schema({
    googleID : String,
    credits: {
        type: Number,
        default: 0
    }
});

mongoose.model('user', userSchema); // mongoose will automatically make plural of user, so it will become users