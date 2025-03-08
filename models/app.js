const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const Course = require('./models/course');
const User = require('./models/user');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const db = require('./models/db');

// Course Routes

// Get list of all courses in the database
app.get("/courses", async function(req, res) {
   try {
      // Fetch all courses from the database
      const courses = await Course.find();
      // Send the courses as a JSON response
      res.json(courses);
   }
   catch (ex) {
      // Send an error response if something goes wrong
      res.status(400).send(ex.message);
   }
});

// Add a new course to the database
app.post("/courses", async function(req, res) {
   try {
      // Create a new course with the request body data
      const newCourse = new Course(req.body);
      // Save the course to the database
      await newCourse.save();
      // Send a success response with the created course
      res.status(201).json(newCourse);
   }
   catch (ex) {
      // Send an error response if something goes wrong
      res.status(400).send(ex.message);
   }
});

// Update an existing course in the database
app.put("/courses/:id", async function(req, res) {
   // Course to update sent in body of request
   const updatedCourse = req.body;

   try {
      // Replace existing course fields with updated course
      const result = await Course.updateOne({ _id: req.params.id }, updatedCourse);
      if (result.matchedCount === 0) {
         // Send a 404 response if the course is not found
         res.sendStatus(404);
      } else {
         res.sendStatus(200);
      }
   }
   catch (ex) {
      // Send an error response if something goes wrong
      res.status(400).send(ex.message);
   }
});

// Delete a course from the database
app.delete("/courses/:id", async (req, res) => {
   try {
      await Course.deleteOne({ _id: req.params.id });
      res.sendStatus(204);
   } catch (err) {
      res.status(400).send(err);
   }
});

// User Routes

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
  console.log(`Server running on http://localhost:${port}`);
});