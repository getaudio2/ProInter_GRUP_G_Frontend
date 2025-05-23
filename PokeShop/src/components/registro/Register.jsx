import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rol: 'usuario',
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje('Usuario creado exitosamente');

        setTimeout(() => {
          setMensaje('');
          navigate('/login');
        }, 2000);

        setFormData({
          username: '',
          email: '',
          password: '',
          rol: 'usuario',
        });
      } else {
        const errorData = await response.json();
        setMensaje('Error al crear usuario: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
  <div className="registro-container">
    <div className="registro-card">
      <h2 className="registro-title">Registro</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
          className="registro-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="registro-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="registro-input"
        />
        <button type="submit" className="registro-button">Registrarse</button>
      </form>
      {mensaje && <p className="registro-mensaje">{mensaje}</p>}
    </div>
  </div>
);
};

export default Registro;
