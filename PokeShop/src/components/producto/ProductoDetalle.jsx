import "./ProductoDetalle.css"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductoDetalle() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [carrito, setCarrito] = useState(null);
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);
    const user_id = localStorage.getItem("user_id");

    // We retrieve the product data, getting the id from the url param
    useEffect(() => {
        fetch(`http://localhost:8000/api/productos/${id}/`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setSelected(data.rating || 0);
            })
            .catch(err => console.error(err));
    }, [id]);

    // We update the product's rating when the user clicks the star icon
    // and patch the number between 1-5
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

    const addToCart = async () => {
        if (!carrito) {
            try {
                const response = await fetch(`http://localhost:8000/api/carritos/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                }
            } catch (err) {
                console.error("Error creating cart:", err);
            }
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
                    <button className="add-to-cart-btn" onClick={addToCart}>Añadir al carrito</button>
                </div>
            </div>
            <p className="product-description">{product.descripcio}</p>
        </div>
    );
}
