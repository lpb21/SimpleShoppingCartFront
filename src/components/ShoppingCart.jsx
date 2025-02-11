import React,{ useState} from 'react';
import axios from 'axios';
import PaymentModal from './Modalpay.jsx';
import '../ShoppingCart.css';
import config from '../config';

const ShoppingCart = ({ cartItems, removeFromCart, setCart }) => {
const [isModalOpen, setIsModalOpen] = useState(false);



// Calcular el total del carrito
const total = (cartItems || []).reduce((sum, product) => sum + product.price, 0);


const handleCheckout = () => {
    if (cartItems.length === 0) {
        alert('El carrito está vacío');
    } else {
        setIsModalOpen(true);
    }
};

const handlePaymentSubmit = (paymentInfo) => {
    alert('Transacción enviada');
    setIsModalOpen(false);
};

const clearCart = async () => {
    try {
        await axios.delete(`${config.apiUrl}/cart`);
        setCart([]);
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}

return (
    <div className="shopping-cart">
        <h2>Carrito de Compras</h2>
        {cartItems.length === 0 ? (
            <p>El carrito está vacío</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        </div>
        <button onClick={handleCheckout}>Pagar</button>
        {isModalOpen && (
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handlePaymentSubmit}
                total={total}
                clearCart={clearCart}
            />
        )}
    </div>
);
};

export default ShoppingCart;
