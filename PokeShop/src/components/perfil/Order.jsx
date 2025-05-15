// src/components/Order.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Order.css";

export default function Order({ order }) {
  return (
    <div className="order-card">
      <header className="order-header">
        <h3>Orden #{order.id}</h3>
        <span className="order-status">{order.estat}</span>
      </header>
      <p className="order-total">
        Total: <strong>{order.preu_total} €</strong>
      </p>
      <p className="order-date">
        Fecha:{" "}
        {new Date(order.created_at).toLocaleString("es-ES", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>
      <div className="order-items">
        {order.item_orders.length > 0 ? (
          order.item_orders.map((item) => (
            <div key={item.id} className="order-item">
              <Link to={`/productos/${item.product_id.id}`} className="item-link">
                <img
                  src={item.product_id.image_url || "/default.png"}
                  alt={item.product_id.nom}
                  className="item-img"
                />
                <div className="item-info">
                  <p className="item-name">{item.product_id.nom}</p>
                  <p className="item-desc">{item.product_id.descripcio}</p>
                </div>
              </Link>
              <div className="item-meta">
                <span className="item-qty">Cantidad: {item.quantity}</span>
                <span className="item-price">
                  {item.product_id.preu} € c/u
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">Esta orden no tiene productos.</p>
        )}
      </div>
    </div>
  );
}
