import React from "react";
import "./Profile.css";
import Header from "./components/Header"


const Profile = () => {
  return (
    <>
    <Header />
    <section className="profile-container">
      <div className="profile-avatar">
      <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar de usuario" />

      </div>
      <div className="profile-info">
        <p><strong>USERNAME:</strong> nombre_usuario</p>
        <p><strong>EMAIL:</strong> correo@ejemplo.com</p>
      </div>
      <div className="orders-section">
        <h3>MIS PEDIDOS:</h3>
        <div className="orders-carousel">
          {[1, 2, 3, 4,5,6,7,8,9,10,11,12].map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-image"></div>
              <p>Descripción del pedido {order}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Profile;
