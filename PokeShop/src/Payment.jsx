import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';

export default function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveMethod, setSaveMethod] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const orderId = parseInt(queryParams.get('orderId'), 10);

const handleSubmit = async (event) => {
  event.preventDefault();

 
  const cardNumberRegex = /^[0-9]{16}$/;
  const expiryMonthRegex = /^(0[1-9]|1[0-2])$/;
  const expiryYearRegex = /^[0-9]{2}$/;
  const cvvRegex = /^[0-9]{3}$/;

  if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
    alert('Número de tarjeta inválido. Debe ser de 16 dígitos.');
    return;
  }
  if (!expiryMonth || !expiryMonthRegex.test(expiryMonth)) {
    alert('Mes de caducidad inválido. Debe ser entre 01 y 12.');
    return;
  }
  if (!expiryYear || !expiryYearRegex.test(expiryYear)) {
    alert('Año de caducidad inválido. Debe ser un número de 2 dígitos.');
    return;
  }
  if (!cvv || !cvvRegex.test(cvv)) {
    alert('CVV inválido. Debe ser un número de 3 dígitos.');
    return;
  }

  if (!orderId) {
    alert('ID de la orden no encontrado.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/api/orders/${orderId}/update-status/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Completada' }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    console.log('Orden actualizada:', data);


    navigate('/payment/confirmation');
  } catch (error) {
    console.error(error);
  }
};


  const handleCancel = async () => {
    if (!orderId) {
      navigate('/perfil');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/orders/delete/${orderId}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error eliminando la orden: ${response.statusText}`);
      }

      navigate('/perfil');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Mètode de Pagament - Targeta</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label>Dades de la targeta:</label>

        <div>
          <label>
            Núm. Targeta:
            <input
              type="tel"
              name="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Data caducitat:
            <div className="expiry-date">
              <input
                type="text"
                name="expiryMonth"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                placeholder="MM"
                maxLength="2"
                required
              />
              <span>/</span>
              <input
                type="text"
                name="expiryYear"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                placeholder="YY"
                maxLength="2"
                required
              />
            </div>
          </label>
        </div>

        <div>
          <label>
            CVS:
            <input
              type="text"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              required
            />
          </label>
        </div>

        <div className="buttons">
          <button type="button" onClick={handleCancel}>Cancel·lar</button>
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
}
