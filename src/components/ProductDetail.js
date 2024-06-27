import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../utils/cartUtils';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the product details!", error);
            });
    }, [id]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: parseInt(quantity, 10) });
        alert('Producto agregado al carrito');
        navigate('/');
    };

    const handleBuyNow = () => {
        addToCart({ ...product, quantity: parseInt(quantity, 10) });
        navigate('/cart');
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
            <div className="product-detail-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    min="1"
                    max={product.stockQuantity}
                />
                <button onClick={handleAddToCart}>Agregar al Carrito</button>
                <button onClick={handleBuyNow}>Comprar</button>
            </div>
        </div>
    );
}

export default ProductDetail;
