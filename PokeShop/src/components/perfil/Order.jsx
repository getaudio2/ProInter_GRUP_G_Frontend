import React from "react";
import { Link } from "react-router-dom";
import "./Order.css";

export default function Order({ order }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Orden #{order.id}</h3>
      </div>

      <p className="order-total">
        Total: <strong>{order.preu_total} €</strong>
      </p>

      <Link to={`/orders/${order.id}`}>
        <button className="view-more-button">Ver más</button>
      </Link>
    </div>
  );
}
