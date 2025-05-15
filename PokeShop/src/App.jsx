import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login/Login.jsx'
//import MainPage from './components/main-page/MainPage.jsx'
import Registro from "./components/registro/Register.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {//<Route path="/main-page" element={<MainPage />} />
        }
      </Routes>
      <Registro/>
    </BrowserRouter>
  )
}

export default App
