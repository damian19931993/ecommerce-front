import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { getCart } from '../utils/cartUtils'; // Importar la función getCart

const Checkout = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = getCart(); // Obtener artículos del carrito desde localStorage
        setCartItems(items);
    }, []);

    useEffect(() => {
        const createPreference = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/payments/create', { items: cartItems });
                setPreferenceId(response.data.id);
            } catch (error) {
                console.error('Error creating preference', error);
            }
        };

        if (cartItems.length > 0) {
            createPreference();
        }
    }, [cartItems]);

    useEffect(() => {
        initMercadoPago('TEST-d4093e73-37a3-497f-9ed2-807f75d778f0'); // Replace with your public key
    }, []);

    return (
        <div>
            <h1>Checkout</h1>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
    );
};

export default Checkout;
