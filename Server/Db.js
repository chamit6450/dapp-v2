const mongoose = require('mongoose');

require('dotenv').config();

// Get the connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected"))

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

// Export models
module.exports = {
    // Data,
    User
};