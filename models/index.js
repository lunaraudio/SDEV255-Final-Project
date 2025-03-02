// Middleware that parses HTTP requests with JSON body
// app.use(express.json());

// const router = express.Router();

// Get list of all courses in the database
// router.get("/courses", async function(req, res) {
//    try {
//       // Fetch all courses from the database
//       const courses = await Course.find();
//       // Send the courses as a JSON response
//       // res.json(courses);
//    }
//    catch (ex) {
//       // Send an error response if something goes wrong
//       res.status(400).send(ex.message);
//    }
// });

// Add a new course to the database
// router.post("/courses", async function(req, res) {
//    try {
//       // Create a new course with the request body data
//       const course = new Course(req.body);
//       // Save the course to the database
//       await course.save();
//       // Send a success response with the created course
//       res.status(201).json(course);
//    }
//    catch (ex) {
//       // Send an error response if something goes wrong
//       res.status(400).send(ex.message);
//    }
// });

// Use the router for API routes
// app.use("/api", router);

// Start the server on port 3000
// app.listen(3000);

// Update an existing course in the database
// router.put("/:id", async function(req, res) {
//    // Course to update sent in body of request
//    const course = req.body;

//    try {
//       // Replace existing course fields with updated course
//       const result = await Course.updateOne({ _id: req.params.id }, course);
//       if (result.matchedCount === 0) {
//          // Send a 404 response if the course is not found
//          res.sendStatus(404);
//       }
//    }
//    catch (ex) {
//       // Send an error response if something goes wrong
//       res.status(400).send(ex.message);
//    }
// });

// Wait for the DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//     const courseForm = document.getElementById("course-form");
//     const courseList = document.getElementById("course-list");

//     // Handle form submission
//     courseForm.addEventListener("submit", function(e) {
//         e.preventDefault();
//         // Get form values
//         const name = document.getElementById("course-name").value;
//         const description = document.getElementById("course-description").value;
//         const teacher = document.getElementById("course-teacher").value;
//         const credits = document.getElementById("course-credits").value;
        
//         // Add the new course to the list
//         addCourse({ name, description, teacher, credits });
//         // Reset the form
//         courseForm.reset();
//     });

//     // Function to add a course to the list
//     function addCourse(course) {
//         const li = document.createElement("li");
//         li.classList.add("course-item");
//         li.innerHTML = `
//             <span>${course.name} - ${course.description} - ${course.teacher} - ${course.credits} Credits</span>
//             <button class="edit-button">Edit</button>
//             <button class="delete-button">Delete</button>
//         `;
//         courseList.appendChild(li);

//         const editButton = li.querySelector(".edit-button");
//         const deleteButton = li.querySelector(".delete-button");

//         editButton.addEventListener("click", () => editCourse(li, course));
//         deleteButton.addEventListener("click", () => li.remove());
//     }

//     function editCourse(li, course) {
//         document.getElementById("course-name").value = course.name;
//         document.getElementById("course-description").value = course.description;
//         document.getElementById("course-teacher").value = course.teacher;
//         document.getElementById("course-credits").value = course.credits;

//         li.remove();
//     }
// });