const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    about: {
        type: String,
    },
    address: {
        type: String,
    },
    profileImage: {
        type: String,
    },
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
