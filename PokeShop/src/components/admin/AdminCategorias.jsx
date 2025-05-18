import React, { useState, useEffect } from 'react';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categorias/');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/categorias/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: nombreCategoria }),
      });

      if (response.ok) {
        setNombreCategoria('');
        fetchCategorias();
      }
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/categorias/delete/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCategorias();
      }
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/categorias/update/${categoriaEditando.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: nombreCategoria }),
      });

      if (response.ok) {
        setModoEdicion(false);
        setNombreCategoria('');
        setCategoriaEditando(null);
        fetchCategorias();
      }
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    }
  };

  const iniciarEdicion = (categoria) => {
    setModoEdicion(true);
    setNombreCategoria(categoria.nom);
    setCategoriaEditando(categoria);
  };

  return (
    <div>
      <h2>Gestión de Categorías</h2>
      <form onSubmit={modoEdicion ? handleActualizar : handleCrear} className="admin-form">
        <input
          type="text"
          placeholder="Nombre de categoría"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
        {modoEdicion && (
          <button type="button" onClick={() => { setModoEdicion(false); setNombreCategoria(''); }}>
            Cancelar
          </button>
        )}
      </form>

      <ul className="admin-list">
        {categorias.map((cat) => (
          <li key={cat.id}>
            {cat.nom}
            <div>
              <button onClick={() => iniciarEdicion(cat)}>Editar</button>
              <button onClick={() => handleEliminar(cat.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategorias;