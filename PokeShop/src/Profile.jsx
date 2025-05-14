import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "./components/inici/Header";
import Order from "./components/perfil/Order";
import { Link } from "react-router-dom";

const Profile = () => {
  const userId = 1;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 1. Obtener las órdenes del usuario cuando el componente se monta
    fetch(`http://127.0.0.1:8000/api/orders/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data); // Guardamos las órdenes en el estado
      })
      .catch((err) => console.error("Error al obtener órdenes", err));
  }, [userId]);

  return (
    <>
      <Header />
      <section className="profile-container">
        <div className="profile-avatar">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="Avatar de usuario"
          />
        </div>
        <div className="profile-info">
          <p>
            <strong>USERNAME:</strong> nombre_usuario
          </p>
          <p>
            <strong>EMAIL:</strong> correo@ejemplo.com
          </p>
        </div>

        {/* Botón para ir al pago */}
        <div className="go-to-payment">
          <Link to="/payment">
            <button className="payment-button">Realitzar Pagament</button>
          </Link>
        </div>

        {/* Listado de órdenes del usuario */}
        <div className="orders-section">
          <h3>Mis Órdenes:</h3>
          {orders.length === 0 ? (
            <p>No tienes órdenes registradas.</p>
          ) : (
            orders.map((order) => (
              <Order key={order.id} order={order} /> // Pasamos cada orden al componente Order
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
