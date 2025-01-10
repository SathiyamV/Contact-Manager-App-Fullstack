import React, { useState, useEffect } from 'react';

const ContactForm = ({ contact, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || ''
    });

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        }
    }, [contact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Remove email if it's empty
            const submitData = {
                ...formData,
                email: formData.email || undefined
            };
            await onSubmit(submitData);
        } catch (err) {
            console.error('Form submission error:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">
                    {contact ? 'Edit Contact' : 'Add Contact'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email (Optional)"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {contact ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;