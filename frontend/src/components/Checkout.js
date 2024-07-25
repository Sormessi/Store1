import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import PayPalButton from './PayPalButton';

const stripePromise = loadStripe('your-public-key-from-stripe');

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { data: sessionId } = await axios.post('http://localhost:5000/api/checkout', { items: cart });

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Stripe Checkout error:', error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>Pay with Stripe</button>
      <PayPalButton amount={cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} />
    </form>
  );
};

const Checkout = ({ location }) => {
  const { cart } = location.state || { cart: [] };

  return (
    <div>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} />
      </Elements>
    </div>
  );
};

export default Checkout;
