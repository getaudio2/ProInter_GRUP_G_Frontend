import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Carrito.css"
const Carrito = ({ usuarioid }) => {
  const [carrito, setCarrito] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const obtenerUsuarioId = () => {
    const match = document.cookie.match(/(^|;\s*)id\s*=\s*([^;]+)/);
    return match ? match[2] : null;
  };

  const fetchCart = async (userId) => {
    try {
      const resCarrito = await fetch(`http://localhost:8000/api/carritos/usuario/${userId}/`);
      if (!resCarrito.ok) throw new Error('No se pudo obtener el carrito');

      const data = await resCarrito.json();
      setCarrito(data.carrito);
      localStorage.setItem("cart_id", data.carrito.id);

      const enrichedItems = await Promise.all(
        data.items.map(async (item) => {
          const resProducto = await fetch(`http://localhost:8000/api/productos/${item.product_id}/`);
          const producto = await resProducto.json();
          return { ...item, product_id: producto };
        })
      );
      setItems(enrichedItems);
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = Number(usuarioid || obtenerUsuarioId());

    if (id) {
      fetchCart(id);
    } else {
      console.error("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [usuarioid]);

  const handleBuy = async () => {
  setMessage('Creando orden...');
  const userId = Number(usuarioid || obtenerUsuarioId());

  if (!userId || isNaN(userId)) {
    setMessage('No se encontró un ID de usuario válido.');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/orders/add-items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    });

    if (response.ok) {
      const data = await response.json();
      const orderId = data.order.id;
      setMessage('Orden creada correctamente. Redirigiendo a pago...');
      navigate(`/payment?orderId=${orderId}`);
    } else {
      const errorData = await response.json();
      setMessage(`Error al crear la orden: ${errorData.error || 'Error desconocido'}`);
    }
  } catch (error) {
    console.error('Error al crear la orden:', error);
    setMessage('Error en la conexión al crear la orden.');
    }
  };


  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/item-carrito/delete/${itemId}/`, {
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

      <button onClick={handleBuy} style={{ marginTop: '20px' }}>
        Comprar
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Carrito;