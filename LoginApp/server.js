// Step 1: Install dependencies
// Run these in terminal: npm init -y && npm install express mongoose cors body-parser

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Step 2: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Step 3: Create User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Step 4: API to handle login data
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "User saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving user" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
