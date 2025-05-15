import React, { useEffect, useState } from 'react';

const Carrito = ({ usuarioid }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${id}/`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        const lastOrder = data[data.length - 1]; // Última orden (carrito actual)
        setOrder(lastOrder);
      } else {
        setOrder(null);
      }
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let id = usuarioid;
    if (!id) {
      const match = document.cookie.match(/(^|;\s*)id\s*=\s*([^;]+)/);
      if (match) {
        id = match[2];
      }
    }

    if (id) {
      fetchCart(id);
    } else {
      console.error("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [usuarioid]);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/item-carrito/delete/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrder(prev => ({
          ...prev,
          item_orders: prev.item_orders.filter(item => item.id !== itemId),
        }));
      }
    } catch (err) {
      console.error('Error al eliminar producto del carrito:', err);
    }
  };

  const handleQuantityChange = async (itemOrderId, newQuantity) => {
    if (newQuantity <= 0) return;
    try {
      const response = await fetch(`http://localhost:8000/api/order/${order.id}/itemorder/${itemOrderId}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        // Refresca el carrito
        fetchCart(order.id);
      }
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
    }
  };

  if (loading) return <p>Cargando carrito...</p>;
  if (!order) return <p>No hay productos en tu carrito.</p>;

  return (
    <div className="carrito">
      <h2>Tu Carrito</h2>
      {order.item_orders.map(item => (
        <div key={item.id} className="producto-carrito">
          <img src={item.product_id.img} alt={item.product_id.nom} width="100" />
          <div>
            <h3>{item.product_id.nom}</h3>
            <p>{item.product_id.descripcio}</p>
            <p>Precio unitario: €{item.product_id.preu}</p>
            <label>
              Cantidad:
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
            </label>
            <button onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}
      <h3>Total: €{order.preu_total}</h3>
    </div>
  );
};

export default Carrito;
