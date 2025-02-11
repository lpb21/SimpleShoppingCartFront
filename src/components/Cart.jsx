import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    axios.get(`${config.apiUrl}/cart`)
      .then(response => {
        setCartProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart products:', error);
      });
  }, []);

  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {cartProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;