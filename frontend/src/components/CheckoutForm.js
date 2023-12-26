import React from 'react';
import { useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import CardSection from './CardSection.js';
import { connect } from 'react-redux';
import { addCredits } from '../actions/index.js';
import { Button } from '@mui/material';

const CheckoutForm = ({ setOpen, addCredits }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const res = await axios.post('/api/stripe');
        const clientSecret = res.data.clientSecret;
        console.log(clientSecret);
        const card = elements.getElement(CardElement);
        console.log(card);
        const { paymentIntent, error } =
            await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: { card: card }
                }
            );
        if (error) {
            console.log(error.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                addCredits();
            }
            setOpen(false);
            console.log(paymentIntent);
        }
    };

    return (
        <form>
            <CardSection />
            <div style={{margin:'20px'}}>
                <Button variant="contained" color="success" sx={{margin: '0px 10px'}} disabled={!stripe} onClick={handleSubmit}>Pay</Button>
                <Button variant="contained" color="error" sx={{margin: '0px 10px'}} onClick={() => setOpen(false)}>Cancel</Button>
            </div>
        </form>
    );
}
export default connect(null, { addCredits })(CheckoutForm);
// test card number 4000003560000008