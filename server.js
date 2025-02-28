const express = require("express")
var cors = require('cors')

const server = express()
const bodyParser = require('body-parser')
const course = require("./models/courses")
server.use(cors())

// Middleware that parses HTTP requests with JSON body
server.use(bodyParser.json())
const router = express.Router()

// Get list of all courses in the database
router.get("/courses", async function(req, res) {
   try {
      // Fetch all courses from the database
      const courses = await course.find()
      // Send the courses as a JSON response
      res.json(courses)
   }
   catch (ex) {
      // Send an error response if something goes wrong
      res.status(400).send(ex.message)
   }
})

// Add a new course to the database
router.post("/courses", async function(req, res) {
   try {
      // Create a new course with the request body data
      const newCourse = new course(req.body)
      // Save the course to the database
      await newCourse.save()
      // Send a success response with the created course
      res.status(201).json(newCourse)
   }
   catch (ex) {
      // Send an error response if something goes wrong
      res.status(400).send(ex.message)
   }
})

// Update an existing course in the database
router.put("/:id", async function(req, res) {
   // Course to update sent in body of request
   const updatedCourse = req.body

   try {
      // Replace existing course fields with updated course
      const result = await course.updateOne({ _id: req.params.id }, updatedCourse)
      if (result.matchedCount === 0) {
         // Send a 404 response if the course is not found
         res.sendStatus(404)
      }
   }
   catch (ex) {
      // Send an error response if something goes wrong
      res.status(400).send(ex.message)
   }
})

// Use the router for API routes
server.use("/api", router)

// Start the server on port 3000
server.listen(3000)
