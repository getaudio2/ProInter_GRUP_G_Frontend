import { useEffect, useState } from "react";
import ProductoMini from "./ProductoMini";
import "./Catalogo.css"

export default function Catalogo({productos}) {
    return (
        <div>
            <section className="productos-container">
            {
                productos.map((producto, index) => (
                    <ProductoMini
                        key={index}
                        id={producto.id}
                        nom={producto.nom}
                        descripcio={producto.descripcio}
                        nomCategoria={producto.nom_categoria}
                        preu={producto.preu}
                        img={producto.img}
                    />
                ))
            }
            </section>
        </div>
    );
}
