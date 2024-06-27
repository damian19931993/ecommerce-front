// src/utils/cartUtils.js

export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateProductQuantity = (productId, quantity) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};
