import "./ProductoDetalle.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductoDetalle() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [carrito, setCarrito] = useState(() => localStorage.getItem("cart_id"));
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const user_id_match = document.cookie.match(/(^|;\s*)id\s*=\s*([^;]+)/);
    const user_id = user_id_match ? user_id_match[2] : null;

    useEffect(() => {
        fetch(`http://localhost:8000/api/productos/${id}/`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setSelected(data.rating || 0);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleRate = async (rating) => {
        setSelected(rating);
        try {
            await fetch(`http://localhost:8000/api/productos/update/${id}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating }),
            });
        } catch (err) {
            console.error("Error updating rating:", err);
        }
    };

    const addToCart = async () => {
        if (!user_id) {
            alert("Please log in to add items to cart");
            return;
        }

        let cartId = carrito;

        if (!cartId) {
            try {
                const response = await fetch("http://localhost:8000/api/carritos/create/", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id }),
                });

                if (!response.ok) throw new Error("Failed to create cart");

                const data = await response.json();
                cartId = data.id;
                setCarrito(cartId);
                localStorage.setItem("cart_id", cartId);
            } catch (err) {
                return console.error("Error creating cart:", err);
            }
        }

        try {
            const itemsResponse = await fetch(`http://localhost:8000/api/item-carrito/`);
            const allItems = await itemsResponse.json();

            const existingItem = allItems.find(item =>
                item.cart_id == cartId && item.product_id == product.id
            );

            if (existingItem) {
                const updateResponse = await fetch(
                    `http://localhost:8000/api/item-carrito/update/${existingItem.id}/`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            quantity: existingItem.quantity + 1
                        }),
                    }
                );

                if (!updateResponse.ok) throw new Error("Failed to update item quantity");
                console.log("Item quantity updated:", existingItem.id);
            } else {
                const createResponse = await fetch("http://localhost:8000/api/item-carrito/create/", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cart_id: cartId,
                        product_id: product.id,
                        quantity: 1
                    }),
                });

                if (!createResponse.ok) throw new Error("Failed to add product to cart");
                const itemData = await createResponse.json();
                console.log("New item added to cart:", itemData);
            }

            // Mensaje confirmación añadir al carrito
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);

        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };

    if (!product) return <p>Cargando...</p>;

    return (
        <div className="product-main">

            {showSuccessMessage && (
                <div style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    backgroundColor: "#4caf50",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    zIndex: 9999,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    fontWeight: "bold",
                }}>
                    Producto añadido correctamente al carrito
                </div>
            )}

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
            <div className="product-description">
                <h3>Descripción</h3>
                <p>{product.descripcio}</p>
            </div>
        </div>
    );
}
