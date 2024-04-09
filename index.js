require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
    response.json({ message: 'This is the server' });
});

app.get('*', (request, response) => {
    response.status(404).json({ message: 'Not Found' });
});

// Handle all errors
app.use({error, request, response, next)}==>)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
