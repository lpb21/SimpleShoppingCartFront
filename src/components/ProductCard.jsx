import React from 'react';

const ProductCard = ({ product, addToCart }) => {
    console.log(4, 'ProductCard:', product);
    if (!product) {
        return null; // O muestra un mensaje de error
      }
  return (
    <li>
      <h4>{product.name}</h4>
      <p>Precio: ${product.price}</p>
      <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
    </li>
  );
};

export default ProductCard;