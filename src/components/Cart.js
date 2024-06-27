import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateProductQuantity } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
            setCart(getCart());
        }
    }, []);

    const handleRemove = (productId) => {
        removeFromCart(productId);
        setCart(getCart());
    };

    const handleQuantityChange = (productId, quantity) => {
        updateProductQuantity(productId, parseInt(quantity, 10));
        setCart(getCart());
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (!user) {
        return (
            <div className="cart">
                <h2>Your Cart</h2>
                <p>Please log in to view your cart.</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    min="1"
                                    max={item.stockQuantity}
                                />
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cart.length > 0 && (
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
            )}
        </div>
    );
}

export default Cart;
