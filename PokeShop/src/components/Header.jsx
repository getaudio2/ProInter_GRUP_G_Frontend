
import "./Header.css"
import pokeball from '../assets/pokeball.jpg';

const Header = () => {
    return (
      <header className="header">
        <div className="logo"><img src={pokeball} alt="Logo de la Tenda: Pokeball" /></div>
        <nav className="navegador">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#" className="hover:underline">Tienda</a>
          <a href="#" className="hover:underline">Contactar</a>
        </nav>
        <div>
          <button className="rounded-full bg-gray-300 p-2">👤</button>
        </div>
      </header>
    );
  };
  
  export default Header;