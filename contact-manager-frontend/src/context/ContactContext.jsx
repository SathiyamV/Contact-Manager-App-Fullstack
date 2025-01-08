import React, { createContext, useState, useEffect } from 'react';
import { getContacts } from '../services/contactService';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContacts = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication required');
            setLoading(false);
            return;
        }

        try {
            const data = await getContacts();
            setContacts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContactContext.Provider value={{ 
            contacts, 
            loading, 
            error, 
            fetchContacts,
            setContacts 
        }}>
            {children}
        </ContactContext.Provider>
    );
};