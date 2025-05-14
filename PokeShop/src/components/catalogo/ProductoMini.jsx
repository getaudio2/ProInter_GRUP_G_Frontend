import { useNavigate } from 'react-router-dom';
import "./ProductoMini.css"

export default function ProductoMini(props) {
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/producto/${props.id}`);
    };

    const nom = props.nom;
    const descripcio = props.descripcio;
    const img = props.img;
    let preu = props.preu;
    return(
        <div className="div-producto">
            <img src={img} alt="img" />
            <h1>{nom}</h1>
            <p>{descripcio}</p>
            <h3>Preu: {preu}€</h3>
            <button className="detail-btn" onClick={goToDetail}>Ver Detalles</button>
        </div>
    );
}