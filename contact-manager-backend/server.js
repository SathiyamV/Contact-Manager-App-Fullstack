const express = require('express');
const errorHandler = require('./middleware/errorHandler.js');
const connectDb = require('./config/dbConnection.js');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});