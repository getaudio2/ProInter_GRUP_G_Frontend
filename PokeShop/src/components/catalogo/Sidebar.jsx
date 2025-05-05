import { useEffect, useState } from "react";

export default function Sidebar({ onCategoryChange }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCheckboxChange = (category) => {
        const newCategory = selectedCategory === category ? null : category;
        setSelectedCategory(newCategory);
        onCategoryChange(newCategory);
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
        <div style={{ marginRight: "100px" }}>
            <h3>Categories</h3>
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
