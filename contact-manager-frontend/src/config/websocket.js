const WS_URL = process.env.NODE_ENV === 'production' 
    ? 'wss://your-production-url.com/ws'
    : 'ws://localhost:5000/ws';

export default WS_URL;