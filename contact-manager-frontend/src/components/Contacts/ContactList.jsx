import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar';
import { getContacts, createContact, updateContact, deleteContact } from '../../services/contactService';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingContact) {
                await updateContact(editingContact._id, formData);
            } else {
                await createContact(formData);
            }
            await fetchContacts();
            setIsModalOpen(false);
            setEditingContact(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            await fetchContacts();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredContacts(contacts);
            return;
        }

        const searchTerm = query.toLowerCase();
        const filtered = contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email?.toLowerCase().includes(searchTerm) ||
            contact.phone.toLowerCase().includes(searchTerm)
        );
        setFilteredContacts(filtered);
    };

    const sortContacts = (contacts) => {
        return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    };

    const renderContacts = () => {
        const contactsToShow = filteredContacts.length > 0 ? filteredContacts : contacts;
        const sortedContacts = sortContacts(contactsToShow);

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedContacts.map(contact => (
                    <ContactCard
                        key={contact._id}
                        contact={contact}
                        onEdit={() => {
                            setEditingContact(contact);
                            setIsModalOpen(true);
                        }}
                        onDelete={() => handleDelete(contact._id)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Contacts</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Add Contact
                </button>
            </div>

            <SearchBar onSearch={handleSearch} />
            
            {renderContacts()}

            {isModalOpen && (
                <ContactForm 
                    contact={editingContact}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingContact(null);
                    }}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default ContactList;