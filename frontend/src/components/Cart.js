import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to={{ pathname: "/checkout", state: { cart } }}>
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
