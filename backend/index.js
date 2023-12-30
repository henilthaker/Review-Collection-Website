const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
const billingRoutes = require('./routes/billingRoutes.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
const cors = require('cors');
require('./models/user.js'); // user.js should be executed before passport.js
require('./services/passport.js'); // just to run the code in the passport.js file
require('./models/surveys.js');
const surveyRoutes = require('./routes/surveyRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());
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
app.use('/', billingRoutes);
app.use('/', surveyRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(keys.mongoURI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening to requests on port', PORT);
        });
    })
    .catch((err) => console.log(err));