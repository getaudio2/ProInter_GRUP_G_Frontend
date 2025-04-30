import "./ProductoMini.css"

export default function ProductoMini(props) {

    const nom = props.nom;
    const descripcio = props.descripcio;
    let preu = props.preu;
    return(
        <div className="div-producto">
            {//<img src={srcImg} alt="img" />
            }
            <h1>{nom}</h1>
            <p>{descripcio}</p>
            <h3>Preu: {preu}$</h3>
        </div>
    );
}