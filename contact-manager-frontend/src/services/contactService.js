const API_URL = process.env.REACT_APP_API_URL + '/contacts';

const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
});

export const getContacts = async () => {
    const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const createContact = async (contactData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeader(),
        credentials: 'include',
        body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return response.json();
};

export const updateContact = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        credentials: 'include',
        body: JSON.stringify(Object.assign({}, data))
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
        credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
};

export const searchContacts = async (query) => {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`, {
        headers: getAuthHeader(),
        credentials: 'include'
    });
    if (!response.ok) throw new Error('Search failed');
    return response.json();
};