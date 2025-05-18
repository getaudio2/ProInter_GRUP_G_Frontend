import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Catalogo from "./Catalogo.jsx";


export default function CatalogoPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const endpoint = selectedCategory
                    ? `http://127.0.0.1:8000/api/productos/categoria/${selectedCategory}/`
                    : "http://127.0.0.1:8000/api/productos/";

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();
                if (response.ok) {
                    setProductos(data);
                } else {
                    console.error("Error amb el fetch de productes:", data);
                }
            } catch (error) {
                console.error("Error al request:", error);
            }
        };

        fetchProductos();
    }, [selectedCategory]);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar onCategoryChange={setSelectedCategory} />
            <Catalogo productos={productos} />
        </div>
    );
}
