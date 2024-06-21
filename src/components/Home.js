import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import '../styles/Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/products?limit=10')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });

        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="homepage">
            <header className="header">
                <h1 className="store-name">Tienda Fabi</h1>
                <nav className="nav">
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/contact">Contact</a>
                    {user ? (
                        <div className="user-info">
                            <span>Hola, {user.firstName}</span>
                            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
                        </div>
                    ) : (
                        <button className="login-button" onClick={handleLoginClick}>Iniciar Sesión</button>
                    )}
                </nav>
            </header>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
