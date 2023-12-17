const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/user.js') // user.js should be executed before passport.js
require('./services/passport.js') // just to run the code in the passport.js file

const app = express();
app.use(cookieSession({
    maxAge: 3*24*60*60*1000, // 3 days expressed in milliseconds.
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.send("Hi there, welcome");
});

app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(keys.mongoURI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening to requests');
        });
    })
    .catch((err) => console.log(err));