import React, { useEffect, useState } from 'react';

const Carrito = ({ userId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${userId}/`);
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
    fetchCart(); 
  }, [userId]);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/itemorder/${itemId}/delete/`, {
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
        fetchCart(); 
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
          <img src={item.product_id.image} alt={item.product_id.name} width="100" />
          <div>
            <h3>{item.product_id.name}</h3>
            <p>{item.product_id.description}</p>
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
