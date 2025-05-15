import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login/Login.jsx'
import Registro from "./components/registro/Register.jsx";

import CatalogoPage from './components/catalogo/CatalogoPage.jsx'
import ProductoDetalle from "./components/producto/ProductoDetalle.jsx";
import Header from "./components/inici/Header.jsx";


import Profile from './Profile';
import Inici  from './Inici'; 
import Payment from './Payment';
import Confirmation from './PaymentConfirm';
import Carrito from "./Carrito.jsx";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/" element={<Inici />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/confirmation" element={<Confirmation />} />

      </Routes>
    </BrowserRouter>
    
  )
}

export default App;



