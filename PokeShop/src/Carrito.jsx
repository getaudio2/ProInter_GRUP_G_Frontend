import React, { useEffect, useState } from 'react';

const Carrito = ({ usuarioid }) => {
  const [carrito, setCarrito] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async (userId) => {
    try {
      const resCarrito = await fetch(`http://localhost:8000/api/carritos/usuario/${userId}/`);
      if (!resCarrito.ok) throw new Error('No se pudo obtener el carrito');

      const dataCarrito = await resCarrito.json();
      setCarrito(dataCarrito);

      const resItems = await fetch(`http://localhost:8000/api/item-carrito/`);
      const allItems = await resItems.json();

      const itemsUsuario = allItems.filter(item => item.cart_id === dataCarrito.id);
      setItems(itemsUsuario);
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let id = propUserId || localStorage.getItem("user_id");
    if (!id) {
      const match = document.cookie.match(/(^|;\s*)id\s*=\s*([^;]+)/);
      if (match) id = match[2];
    }

    if (id) {
      fetchCart(id);
    } else {
      console.error("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [propUserId]);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/item-carrito/delete/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (err) {
      console.error('Error al eliminar producto del carrito:', err);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity <= 0) return;
    try {
      const response = await fetch(`http://localhost:8000/api/item-carrito/update/${itemId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        setItems(prev =>
          prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
        );
      }
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
    }
  };

  const calcularTotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.product_id.preu, 0);
  };

  if (loading) return <p>Cargando carrito...</p>;
  if (!carrito || items.length === 0) return <p>No hay productos en tu carrito.</p>;

  return (
    <div className="carrito">
      <h2>Tu Carrito</h2>
      {items.map(item => (
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
      <h3>Total: €{calcularTotal()}</h3>
    </div>
  );
};

export default Carrito;
