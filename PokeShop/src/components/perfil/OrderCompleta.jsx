import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./OrderCompleta.css";

export default function OrderCompleto() {
  const { id } = useParams();  // Aquí el order ID
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);  // para guardar los items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  useEffect(() => {
    const userId = getCookie("id");
    if (!userId) {
      setError("No user ID found in cookies");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/order/${userId}/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar la orden");
        return res.json();
      })
      .then((data) => {
        setOrder(data.order);
        setItems(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando orden...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No se encontró la orden.</p>;

  return (
    <div className="order-completo-card">
      <header className="order-header">
        <h2>Orden #{order.id}</h2>
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

      <section className="order-items">
        <h3>Productos:</h3>
        {items.length > 0 ? (
          items.map((item) => {
            const product = item.product_id;
            const imageUrl =
              product.img && product.img !== "0"
                ? product.img
                : "/default.png";

            return (
              <div key={item.id} className="order-item">
                <Link to={`/productos/${product.id}`} className="item-link">
                  <img src={imageUrl} alt={product.nom} className="item-img" />
                  <div className="item-info">
                    <p className="item-name">{product.nom}</p>
                    <p className="item-desc">{product.descripcio}</p>
                  </div>
                </Link>
                <div className="item-meta">
                  <span className="item-qty">Cantidad: {item.quantity}</span>
                  <span className="item-price">{product.preu} € c/u</span>
                  <span className="item-subtotal">
                    Subtotal: {(item.quantity * product.preu).toFixed(2)} €
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p>Esta orden no tiene productos.</p>
        )}
      </section>
    </div>
  );
}
