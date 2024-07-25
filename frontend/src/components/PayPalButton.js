import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount }) => {
  const handleApprove = async (data, actions) => {
    return actions.order.capture().then(async () => {
      // Enviar la información del pago al servidor
      await fetch('http://localhost:5000/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: JSON.parse(localStorage.getItem('cart')) }),
      });
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        }}
        onApprove={handleApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
