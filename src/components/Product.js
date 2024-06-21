import React from 'react';
import '../styles/Product.css';

const Product = ({ product }) => {
    const imageUrl = process.env.PUBLIC_URL + product.imageUrl;
    return (
        <div className="product-card">
            <img src={imageUrl} alt={product.name} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/250"; }} />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
    );
}

export default Product;
