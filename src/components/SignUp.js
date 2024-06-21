import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dni: '',
        address: '',
        city: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
            if (response.status === 200) {
                navigate('/login'); // Redirect to login page after successful sign-up
            }
        } catch (error) {
            setError('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Registrate</h2>
                {error && <p className="error-message">{error}</p>}
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Nombre" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Apellido" 
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    name="dni" 
                    placeholder="DNI" 
                    value={formData.dni}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    name="address" 
                    placeholder="Dirección" 
                    value={formData.address}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="city" 
                    placeholder="Ciudad" 
                    value={formData.city}
                    onChange={handleChange}
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default SignUp;
