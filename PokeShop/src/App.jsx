import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Login from './components/login/Login.jsx'
import CatalogoPage from './components/catalogo/CatalogoPage.jsx'
import ProductoDetalle from "./components/producto/ProductoDetalle.jsx";
import Header from "./components/inici/Header.jsx";

import Profile from './Profile';
import Inici  from './Inici'; 
import Payment from './Payment';
import Confirmation from './PaymentConfirm';
import Carrito from "./Carrito.jsx";
import Nosotros from "./SobreNosotros.jsx"
import Admin from "./components/admin/Admin.jsx";


function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ['/admin'];

  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/confirmation" element={<Confirmation />} />
        <Route path="/Nosotros" element={<Nosotros />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;