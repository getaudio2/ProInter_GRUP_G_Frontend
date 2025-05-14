import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

export default function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveMethod, setSaveMethod] = useState(false);

  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = (event) => {
    event.preventDefault();

    // Expresión regular para validar el número de tarjeta (tarjeta de 16 dígitos)
    const cardNumberRegex = /^[0-9]{16}$/;

    // Expresión regular para validar el mes de expiración (MM)
    const expiryMonthRegex = /^(0[1-9]|1[0-2])$/;

    // Expresión regular para validar el año de expiración (YY)
    const expiryYearRegex = /^[0-9]{2}$/;

    // Expresión regular para validar el CVV (3 dígitos)
    const cvvRegex = /^[0-9]{3}$/;

    // Validación de cada campo
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

    // Redirigir a la página de confirmación si todo es válido
    navigate('/payment/confirmaton');
  };

  const handleCancel = () => {
    // Redirigir a la página de usuario o a la página de inicio
    navigate('/perfil  ');
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

        <div>
          <label>
            <input
              type="checkbox"
              name="saveMethod"
              checked={saveMethod}
              onChange={(e) => setSaveMethod(e.target.checked)}
            />
            Guardar mètode de pagament?
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
