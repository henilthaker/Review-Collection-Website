const express = require('express');
const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js');

const router = express.Router();

router.post('/api/stripe', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 50,
            currency: 'INR',
        });
        console.log(paymentIntent); 
        res.status(200).json({clientSecret: paymentIntent.client_secret});
    } catch (err) {
        console.log(err);
    }
});

router.patch('/api/add-credits',requireLogin, async(req, res)=>{
    try {
        req.user.credits += 5;
        const user = await req.user.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;