import React, { useState, useEffect } from 'react';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nom: '',
    descripcio: '',
    preu: '',
    stock: '',
    nom_categoria: '',
    rating: '',
    img: '',
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    const res = await fetch('http://localhost:8000/api/products/');
    const data = await res.json();
    setProductos(data);
  };

  const fetchCategorias = async () => {
    const res = await fetch('http://localhost:8000/api/categorias/');
    const data = await res.json();
    setCategorias(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editandoId
      ? `http://localhost:8000/api/products/update/${editandoId}/`
      : 'http://localhost:8000/api/products/create/';
    const method = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        nom: '',
        descripcio: '',
        preu: '',
        stock: '',
        nom_categoria: '',
        rating: '',
        img: '',
      });
      setEditandoId(null);
      fetchProductos();
    } else {
      console.error('Error al guardar el producto');
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
    setEditandoId(producto.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;

    const res = await fetch(`http://localhost:8000/api/products/delete/${id}/`, {
      method: 'DELETE',
    });

    if (res.ok) fetchProductos();
    else console.error('Error al eliminar producto');
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nombre" required />
        <input name="descripcio" value={form.descripcio} onChange={handleChange} placeholder="Descripción" required />
        <input name="preu" value={form.preu} onChange={handleChange} type="number" placeholder="Precio" required />
        <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Stock" required />
        <select name="nom_categoria" value={form.nom_categoria} onChange={handleChange} required>
          <option value="">Categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.nom}>{c.nom}</option>
          ))}
        </select>
        <input name="rating" value={form.rating} onChange={handleChange} type="number" placeholder="Rating" required />
        <input name="img" value={form.img} onChange={handleChange} placeholder="Imagen (nombre archivo)" required />
        <button type="submit">{editandoId ? 'Actualizar' : 'Crear'}</button>
        {editandoId && <button onClick={() => { setEditandoId(null); setForm({ nom: '', descripcio: '', preu: '', stock: '', nom_categoria: '', rating: '', img: '' }); }}>Cancelar</button>}
      </form>

      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.nom}</strong> - {prod.nom_categoria} - €{prod.preu}
            <br />
            <button onClick={() => handleEdit(prod)}>Editar</button>
            <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductos;