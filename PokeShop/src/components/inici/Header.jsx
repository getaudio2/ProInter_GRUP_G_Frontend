import { Link } from 'react-router-dom';
import "./Header.css";
import pokeball from '../../assets/pokeball.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={pokeball} alt="Logo de la Tenda: Pokeball" />
          <span className="nombre-tienda">PokeShop</span>
        </Link>
      </div>

      <nav className="navegador">
        <Link to="">Inicio</Link>
        <Link to="/catalogo">Tienda</Link>
        <Link to="/nosotros">Sobre Nosotros</Link>
      </nav>

      <div className="icons">
        <Link to="/carrito">
          <button>🛒</button>
        </Link>
        <Link to="/perfil">
          <button>👤</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
