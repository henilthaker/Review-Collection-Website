const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard');
});

router.get('/api/current_user', (req, res) => {
    res.json(req.user);
});

router.get('/api/logout', (req, res) => {
    req.logout(); // passport automatically attaches this logout function to the request object.
    res.redirect('/');
});

module.exports = router;