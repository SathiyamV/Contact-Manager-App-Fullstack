import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from '../../context/ContactContext';
import ContactForm from './ContactForm';
import { createContact, updateContact, deleteContact } from '../../services/contactService';

const ContactList = () => {
    const { contacts, fetchContacts } = useContext(ContactContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map(contact => (
                    <div key={contact._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                        <p className="text-gray-600">{contact.phone}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button 
                                onClick={() => {
                                    setEditingContact(contact);
                                    setIsModalOpen(true);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(contact._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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