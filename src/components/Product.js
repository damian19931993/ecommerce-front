import React from 'react';
import '../styles/Product.css';

const Product = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/250"; }} />
            <h2 className="product-name">{product.name}</h2>
        </div>
    );
}

export default Product;
