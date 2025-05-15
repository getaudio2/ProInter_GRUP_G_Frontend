import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login/Login.jsx'
import Registro from "./components/registro/Register.jsx";
import Carrito from "./Carrito.jsx";
import Admin from "./components/admin/Admin.jsx";
import Catalogo from "./components/catalogo/Catalogo.jsx";
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {//<Route path="/main-page" element={<MainPage />} />

        }
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
