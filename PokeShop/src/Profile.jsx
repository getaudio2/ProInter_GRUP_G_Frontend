import React, { useEffect, useState } from "react";
import "./Profile.css";
import Order from "./components/perfil/Order";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Extraer userId desde la cookie
    const match = document.cookie.match(/(^|;\s*)id\s*=\s*([^;]+)/);
    if (match) {
      const id = match[2];
      setUserId(id);

      // Obtener órdenes
      fetch(`http://127.0.0.1:8000/api/orders/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((err) => console.error("Error al obtener órdenes", err));

      // Obtener usuario
      fetch(`http://127.0.0.1:8000/api/users/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.error("Error al obtener datos del usuario", err));
    } else {
      console.error("No se encontró la cookie con el ID del usuario.");
    }
  }, []);

  return (
    <section className="profile-container">
      <div className="profile-avatar">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="Avatar de usuario"
        />
      </div>
      <div className="profile-info">
        <p>
          <strong>USERNAME:</strong> {user.username}
        </p>
        <p>
          <strong>EMAIL:</strong> {user.email}
        </p>
      </div>

      <div className="go-to-payment">
        <Link to="/payment">
          <button className="payment-button">Realitzar Pagament</button>
        </Link>
      </div>

      <div className="orders-section">
        <h3>Mis Órdenes:</h3>
        {orders.length === 0 ? (
          <p>No tienes órdenes registradas.</p>
        ) : (
          orders.map((order) => <Order key={order.id} order={order} />)
        )}
      </div>
    </section>
  );
};

export default Profile;
