const express = require("express");
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
require('./config/mongoose');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
