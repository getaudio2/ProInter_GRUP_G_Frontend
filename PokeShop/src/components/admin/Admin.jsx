import React from 'react';
import AdminCategorias from './AdminCategorias';
import AdminProductos from './AdminProductos';

const Admin = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <AdminCategorias />
      <hr />
      <AdminProductos />
    </div>
  );
};

export default Admin;
