import React from 'react';
import '../ProductList.css';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list-container">
            <h2>Consultar Inventario</h2>
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>ProductoID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button onClick={() => addToCart(product)}>Agregar al carrito</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;