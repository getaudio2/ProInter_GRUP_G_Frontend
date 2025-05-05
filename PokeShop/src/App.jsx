import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Inici  from './Inici'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
