import React, { Component, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
const handleSubmit = async () => {
    const res = await axios.post('/api/stripe');
    const clientSecret = res.data;
    console.log(res.data);
}
const appearance = {
    theme: 'stripe'
  };
const StripeWrapper = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button className='btn' onClick={() => setOpen(true)}>
                Add Credits
            </button>
            <Elements stripe={stripePromise} appearance={appearance}>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent sx={{width: 500}}>
                        <CheckoutForm setOpen={setOpen}/>
                    </DialogContent>
                </Dialog>
            </Elements>
        </div >
    );
}
export default connect(null, actions)(StripeWrapper);