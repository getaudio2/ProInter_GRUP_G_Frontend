import ProductoMini from "./ProductoMini";
import "./Catalogo.css";

export default function Catalogo({ productos }) {
    return (
        <div>
            {
                productos.length === 0 ? (
                    <p style={{ margin: "2rem", fontSize: "1.2rem", color: "#888" }}>
                        Sin productos para la categoria
                    </p>
                ) : (
                    <section className="productos-container">
                        {productos.map((producto, index) => (
                            <ProductoMini
                                key={index}
                                id={producto.id}
                                nom={producto.nom}
                                descripcio={producto.descripcio}
                                nomCategoria={producto.nom_categoria}
                                preu={producto.preu}
                                img={producto.img}
                            />
                        ))}
                    </section>
                )
            }
        </div>
    );
}
