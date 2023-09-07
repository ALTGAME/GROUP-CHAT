const dotenv = require('dotenv');
const express = require('express');
const{chats}= require("./data/data");
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const {notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // to accept json data

app.get('/', (req,res)=>{
    res.send("API is running");

});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server started on port 5000 ${PORT}`));




