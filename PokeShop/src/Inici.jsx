
import Banner from "./components/inici/Banner";
import "./Inici.css";
import iniciales from "./assets/banner_iniciales.webp";

const Inici = () => {
  return (
    <div>
      <Banner />
      <section className="info-tienda">
  <div className="info-content">
    <div className="info-texto">
      <h2>¡Bienvenido Entrenador!</h2>
      <p>
        En nuestra tienda Pokémon encontrarás una gran selección de productos inspirados en el mundo Pokémon:
        desde cartas coleccionables y figuras, hasta ropa y accesorios oficiales. 
        ¡Atrapa tus favoritos y vive la experiencia como un verdadero entrenador Pokémon!
      </p>
    </div>
    <div className="info-boton">
      <a href="/catalogo" className="btn-descubrir">
        Descubre nuestros productos
      </a>
    </div>
    <div className="info-imagen">
      <img src={iniciales} alt="Imatge de Bulbasaur, Squirtle i Charmander"/>
    </div>
  </div>
</section>


    </div>
  );
};

export default Inici;
