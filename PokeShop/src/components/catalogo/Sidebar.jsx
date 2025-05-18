import { useEffect, useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ onCategoryChange, nameFilter, onNameFilterChange }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCheckboxChange = (category) => {
        const newCategory = selectedCategory === category ? null : category;
        setSelectedCategory(newCategory);
        onCategoryChange(newCategory);
    };

    const handleNameFilterChange = (e) => {
        onNameFilterChange(e.target.value);
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const endpoint = "http://localhost:8000/api/categorias/";
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                if (response.ok) {
                    setCategories(data);
                } else {
                    console.error("Error amb el fetch de productes:", data);
                }
            } catch (error) {
                console.error("Error al request:", error);
            }
        };
        fetchCategorias();
    }, []);

    return (
        <div className="sidebar">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                />
            </div>
            <h3>CategorÃ­as</h3>
            {categories.map((categoria, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedCategory === categoria.nom}
                            onChange={() => handleCheckboxChange(categoria.nom)}
                        />
                        {categoria.nom}
                    </label>
                </div>
            ))}
        </div>
    );
}