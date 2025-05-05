import "./ProductoDetalle.css"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductoDetalle() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8000/api/productos/${id}/`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setSelected(data.rating || 0); // set current rating
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleRate = async (rating) => {
        setSelected(rating);
        try {
            await fetch(`http://localhost:8000/api/productos/update/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            });
        } catch (err) {
            console.error("Error updating rating:", err);
        }
    };

    if (!product) return <p>Cargando...</p>;

    return (
        <div className="product-main">
            <div className="product-detail">
                <div className="product-img">
                    <img src={product.img} alt="product-img" />
                </div>
                <div className="product-info">
                    <p className="product-category">{product.nom_categoria}</p>
                    <h2 className="product-title">{product.nom}</h2>
                    <p className="product-price">Precio: {product.preu}€</p>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${hovered >= star || selected >= star ? 'filled' : ''}`}
                                onMouseEnter={() => setHovered(star)}
                                onMouseLeave={() => setHovered(0)}
                                onClick={() => handleRate(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <p className="product-description">{product.descripcio}</p>
        </div>
    );
}
