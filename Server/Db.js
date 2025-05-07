const mongoose = require('mongoose');

require('dotenv').config();

// Get the connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dapp-v2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// // Define schemas and models
// const dataSchema = new mongoose.Schema({
//     email: String,
//     score: Number //To store user's score
// });
// const Data = mongoose.model('Data', dataSchema);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String
});
const User = mongoose.model('User', userSchema);

// Data Schema
const dataSchema = new mongoose.Schema({
    // Add your data schema fields here
});

// Create models
const Data = mongoose.model('Data', dataSchema);

// Export models
module.exports = {
    // Data,
    User
};