import React from 'react';
import AdminCategorias from './AdminCategorias';
import AdminProductos from './AdminProductos';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
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
