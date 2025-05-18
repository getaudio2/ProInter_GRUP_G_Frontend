import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function PaymentConfirm() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = getCookie("id");
    if (!userId) {
      setError("No user ID found in cookies");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/orders/${userId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener las órdenes");
        return res.json();
      })
      .then((data) => {
        const lastOrder = data
          .filter((order) => order.estat === "Completada")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

        if (lastOrder) {
          setOrderId(lastOrder.id);

   
          const cartId = localStorage.getItem("cart_id");
          if (cartId) {
            fetch(`http://127.0.0.1:8000/api/carritos/delete/${cartId}/`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) {
                  console.warn("No s'ha pogut eliminar el carretó");
                } else {
      
                  localStorage.removeItem("cart_id");
                }
              })
              .catch((err) =>
                console.error("Error eliminant el carretó:", err)
              );
          }
        } else {
          setError("No se encontraron órdenes completadas");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregant...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Confirmació de Pagament</h2>
      <p>El teu pagament s'ha realitzat correctament.</p>

      <div
        style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}
      >
        <button onClick={() => navigate("/catalogo")}>Tornar a la Botiga</button>
        {orderId ? (
          <button onClick={() => navigate(`/orders/${orderId}`)}>
            Veure el Meu Pedido
          </button>
        ) : (
          <button disabled>No hi ha comanda per mostrar</button>
        )}
      </div>
    </div>
  );
}
