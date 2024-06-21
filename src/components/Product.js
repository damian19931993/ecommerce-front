import React from 'react';
import axios from 'axios';
import '../styles/Product.css';

const Product = ({ product }) => {
    let user;
    try {
        const userString = localStorage.getItem('user');
        user = userString ? JSON.parse(userString) : null;
    } catch (e) {
        user = null;
    }

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please log in to add products to your cart.');
            return;
        }

        console.log("User Data: ", user);  // Debugging: Ensure correct user data

        try {
            await axios.post(`http://localhost:8080/api/cart/${user.id}/add`, {
                productId: product.id,
                quantity: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,  // Ensure correct token
                    'Content-Type': 'application/json'
                }
            });
            alert('Producto agregado al carrito');
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/250"; }} />
            <h2 className="product-name">{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
    );
}

export default Product;
