const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection. db.js file is in the same folder as app.js
//mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  //  .then(() => console.log("Connected to MongoDB"))
    //.catch(err => console.log("Failed to connect to MongoDB", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  credits: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, 
  // Reference to the teacher who created the course});
  
  const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

const express = require('express');
const router = express.Router();
const Course = require('./models/course');
// Create a new course
router.post('/courses', async (req, res) => {
  const { name, description, subject, credits, createdBy } = req.body;
  const course = new Course({ name, description, subject, credits, createdBy });
  try {
    await course.save();
    res.status(201).json(course);
      } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
});
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, role: this.role }, 'secretKey');
  return token;
};
userSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;

// Auth routes
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  await user.save();
  const token = user.generateAuthToken();
  res.status(201).json({ token });
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.validatePassword(password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = user.generateAuthToken();
  res.json({ token });
});




// User Model
const User = mongoose.model('User', userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User created successfully");
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("User not found");
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send("Invalid credentials");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:5000{port}`);
});
