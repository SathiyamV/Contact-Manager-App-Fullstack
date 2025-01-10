import React, { useState } from 'react';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const ContactCard = ({ contact, onEdit, onDelete }) => {
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [error, setError] = useState(null);

    const handleCopyPhone = async () => {
        try {
            await navigator.clipboard.writeText(contact.phone);
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 1000); // Reduced to 1 second
        } catch (err) {
            setError('Failed to copy phone number');
            setTimeout(() => setError(null), 2000);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
            {error && (
                <div className="text-red-500 mb-2 text-sm">{error}</div>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {contact.name}
            </h3>
            
            {contact.email && (
                <div className="flex items-center gap-2 mb-2">
                    <p className="text-gray-600">Email: {contact.email}</p>
                </div>
            )}

            <div className="flex items-center gap-2 mb-3">
                <p className="text-gray-600">Phone: {contact.phone}</p>
                <button 
                    onClick={handleCopyPhone}
                    className="p-2 rounded-md transition-all duration-75 text-gray-500 hover:text-gray-700"
                    title={copiedPhone ? 'Copied!' : 'Copy phone number'}
                >
                    <span className="transform transition-transform">
                        {copiedPhone ? <CheckIcon /> : <CopyIcon />}
                    </span>
                </button>
            </div>

            <div className="flex gap-2">
                <button onClick={() => onEdit(contact._id)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Edit
                </button>
                <button onClick={() => onDelete(contact._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ContactCard;