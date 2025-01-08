import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;