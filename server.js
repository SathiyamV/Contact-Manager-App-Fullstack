const express = require('express');
const errorHandler = require('./middleware/errorHandler.js');
const connectDb = require('./config/dbConnection.js');
const dotenv = require('dotenv').config()

// mongodb://127.0.0.1:27017


const app = express();
const port = process.env.PORT || 3000
connectDb()

app.use(express.json())

app.use("/api/contacts", require("./routes/contactRoutes.js"))
app.use("/api/users", require("./routes/userRoutes.js"))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})