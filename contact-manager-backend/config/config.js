const config = {
    development: {
        port: 5000,
        cors: {
            origin: ['http://localhost:3000']
        }
    },
    production: {
        port: process.env.PORT || 5000,
        cors: {
            origin: ['https://contact-frontend-71hj.onrender.com']
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];