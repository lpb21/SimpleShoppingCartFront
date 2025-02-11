import React, { useState } from "react";
import '../ModalPay.css';

const PaymentModal = ({ isOpen, onClose, onSubmit, total, clearCart }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 16) {
      setCardNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = expiryDate ? expiryDate.toISOString().split('T')[0] : '';
    const transactionData = { name, cardNumber, total };

    try {
      // Simular una solicitud de pago
      await new Promise((resolve) => setTimeout(resolve, 2500)); // Simular un retraso de 2.5 segundos
      onSubmit(transactionData);
      alert("Pago exitoso");
      clearCart();
      onClose();
    } catch (error) {
      console.error("Error en la transacción:", error);
      alert("Error en la transacción");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Información de Pago</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Número de Tarjeta</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>
          <div>
            <label>Total a Pagar: ${total.toFixed(2)}</label>
          </div>
          <button type="submit">Pagar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
