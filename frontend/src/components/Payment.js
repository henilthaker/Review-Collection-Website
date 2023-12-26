import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = ()=>{
    return (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      );
}
export default Payment;