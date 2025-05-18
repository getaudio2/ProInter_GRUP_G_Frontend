import React, { useEffect, useState } from "react";
import "./Profile.css";
import Order from "./components/perfil/Order";
import { Link } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const Profile = () => {
  const userId = getCookie("id");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8000/api/orders/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.error("Error al obtener órdenes", err));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Error al obtener usuario", err));
  }, [userId]);

  return (
    <>
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

        <div className="logout-section">
          <button
            className="logout-button"
            onClick={() => {
              document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/login";
            }}
          >
            Tancar Sessió
          </button>
        </div>

        <div className="orders-section">
          <h3>Mis Órdenes:</h3>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => <Order key={order.id} order={order} />)
          ) : (
            <p>No tienes órdenes registradas.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
