// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

// Get list of all courses in the database
router.get("/courses", async function(req, res) {
   try {
      const courses = await Course.find();
      res.json(courses);
   }
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

// Add a new course to the database
router.post("/courses", async function(req, res) {
   try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json(courses);
   }
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

app.use("/api", router);

app.listen(3000);

router.put("/:id", async function(req, res) {
   // course to update sent in body of request
   const course = req.body;

   try {
      // Replace existing course fields with updated course
      const result = await Course.updateOne({ _id: req.params.id }, course);
      if (result.matchedCount === 0) {
         res.sendStatus(404);
      } 
      else {
         res.sendStatus(204);
      }
   }
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

document.addEventListener("DOMContentLoaded", () => {
    const courseForm = document.getElementById("course-form");
    const courseList = document.getElementById("course-list");

    courseForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("course-name").value;
        const description = document.getElementById("course-description").value;
        const teacher = document.getElementById("course-teacher").value;
        const credits = document.getElementById("course-credits").value;
        
        addCourse({ name, description, teacher, credits });
        courseForm.reset();
    });

    function addCourse(course) {
        const li = document.createElement("li");
        li.classList.add("course-item");
        li.innerHTML = `
            <span>${course.name} - ${course.description} - ${course.teacher} - ${course.credits} Credits</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        courseList.appendChild(li);

        const editButton = li.querySelector(".edit-button");
        const deleteButton = li.querySelector(".delete-button");

        editButton.addEventListener("click", () => editCourse(li, course));
        deleteButton.addEventListener("click", () => li.remove());
    }

    function editCourse(li, course) {
        document.getElementById("course-name").value = course.name;
        document.getElementById("course-description").value = course.description;
        document.getElementById("course-teacher").value = course.teacher;
        document.getElementById("course-credits").value = course.credits;

        li.remove();
    }
});

