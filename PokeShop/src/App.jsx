import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login/Login.jsx'
import Profile from './Profile';
import Inici  from './Inici'; 
import Payment from './Payment';
import Confirmation from './PaymentConfirm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Inici />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;



