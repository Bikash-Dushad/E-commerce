const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URL; // Replace with your MongoDB connection URI

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
