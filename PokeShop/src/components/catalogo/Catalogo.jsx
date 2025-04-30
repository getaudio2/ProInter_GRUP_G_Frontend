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
                        nom={producto.nom}
                        descripcio={producto.descripcio}
                        nomCategoria={producto.nom_categoria}
                        preu={producto.preu}
                    />
                ))
            }
            </section>
        </div>
    );
}
