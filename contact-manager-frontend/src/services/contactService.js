const API_URL = 'http://localhost:5000/api/contacts';

const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
});

export const getContacts = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: getAuthHeader(),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch contacts');
        }

        return await response.json();
    } catch (error) {
        console.error('getContacts error:', error);
        throw error;
    }
};

export const createContact = async (contactData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return response.json();
};

export const updateContact = async (id, contactData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
};