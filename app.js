const dotenv = require('dotenv').config();
const express = require('express');

const postcode = require('./routes/postcode'); 

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/postcode/:postcode', postcode);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});