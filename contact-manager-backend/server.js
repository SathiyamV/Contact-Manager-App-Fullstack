const express = require('express');
const errorHandler = require('./middleware/errorHandler.js');
const connectDb = require('./config/dbConnection.js');
const cors = require('cors');
const config = require('./config/config.js');
require('dotenv').config(`.env.${process.env.NODE_ENV}`);

const app = express();
const port = config.port;

connectDb();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const allowedOrigins = [
    'http://localhost:3000',
    'https://contact-frontend-71hj.onrender.com'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});