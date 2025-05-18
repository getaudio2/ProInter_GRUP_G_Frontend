import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCategorias from './AdminCategorias';
import AdminProductos from './AdminProductos';
import './Admin.css';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const navigate = useNavigate();

  const obtenerUsuarioId = () => {
    const match = document.cookie.match(/(^|;\s*)id\s*=\s*([^;]+)/);
    return match ? match[2] : null;
  };

  const verificarAdmin = async () => {
    const userId = obtenerUsuarioId();
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/users/${userId}/`);
      if (!res.ok) throw new Error("No se pudo obtener el usuario");
      const data = await res.json();

      if (data.rol === 'admin') {
        setEsAdmin(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error al verificar rol:", error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verificarAdmin();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!esAdmin) return null;

  return (
    <div className="admin-container">
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
      <h1>Panel de Administración</h1>
      <div className="admin-section">
        <AdminCategorias />
      </div>
      <hr />
      <div className="admin-section">
        <AdminProductos />
      </div>
    </div>
  );
};

export default Admin;