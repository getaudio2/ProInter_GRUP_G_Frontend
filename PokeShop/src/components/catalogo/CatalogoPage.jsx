import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Catalogo from "./Catalogo.jsx";
import "./CatalogoPage.css";
import Header from "../inici/Header.jsx";

export default function CatalogoPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [nameFilter, setNameFilter] = useState("");
    const [productos, setProductos] = useState([]);
    const [allProductos, setAllProductos] = useState([]);

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
                    setAllProductos(data);
                } else {
                    console.error("Error amb el fetch de productes:", data);
                }
            } catch (error) {
                console.error("Error al request:", error);
            }
        };

        fetchProductos();
    }, [selectedCategory]);

    useEffect(() => {
        const filtered = allProductos.filter(producto =>
            producto.nom.toLowerCase().includes(nameFilter.toLowerCase())
        );
        setProductos(filtered);
    }, [nameFilter, allProductos]);

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar 
                onCategoryChange={setSelectedCategory} 
                nameFilter={nameFilter}
                onNameFilterChange={setNameFilter}
            />
            <div style={{ flex: 1, padding: "20px" }}>
                <Catalogo productos={productos} selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}