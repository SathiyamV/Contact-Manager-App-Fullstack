import React from 'react';

const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="contact-card">
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <div className="contact-card-actions">
                <button onClick={() => onEdit(contact.id)}>Edit</button>
                <button onClick={() => onDelete(contact.id)}>Delete</button>
            </div>
        </div>
    );
};

export default ContactCard;