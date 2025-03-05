# SDEV255-Final-Project
Final Project
# README for College Course Enrollment Web Application

## Overview
This web application allows students to sign up for college courses, and enables teachers and staff to add, edit, or delete courses. The application provides both students and teachers with an efficient way to manage their course schedules and course listings, facilitating a seamless experience for course registration and administration.

### Key Features:
- **Course Management for Teachers/Staff:**
  - Teachers can add new courses, view, edit, and delete their own courses.
  - Initially, teachers can delete any course, but future updates will restrict deletion to only courses they have created.
  - A course listing page displays all created courses.
  - Each course includes essential details: course name, description, subject area, and number of credits.

- **Student Enrollment System:**
  - Students can sign up for an account, log in, and log out of the application.
  - Students can search for courses by name or number, and can add courses to their own schedule.
  - Students can view a list of courses they are currently enrolled in.
  - Students have the ability to drop or remove courses from their schedule.
  - A personalized schedule page displays the courses a student is enrolled in, with options to add or drop courses.

- **Authentication and Authorization:**
  - The login system differentiates between students and teachers, ensuring appropriate access to course management and registration features.
  - Teachers have the authority to manage courses, while students can only view and register for courses.

---

## Features & Functionalities:

### Teacher Dashboard:
- **Add Courses**: Teachers can create new courses by providing essential information, including the course name, description, subject area, and number of credits.
- **Edit Courses**: Teachers can modify the details of the courses they have created, updating information as necessary.
- **Delete Courses**: Teachers can delete courses they have created. Future versions will restrict this feature to only allow deletion of courses created by the signed-in teacher.
- **View Course List**: Teachers can view a list of all courses that have been created, including their own and others’ courses.

### Student Dashboard:
- **Search & Enroll in Courses**: Students can search for courses based on the course name or number. Upon finding a desired course, they can add it to their schedule.
- **View Enrolled Courses**: Students can view all the courses they are currently enrolled in.
- **Drop Courses**: Students have the option to remove courses from their schedule if they decide not to take them.
  
### General Features:
- **Course Details**: Every course includes the following minimum fields: course name, description, subject area, and number of credits.
- **Login System**: Students and teachers must sign in to access the application. Teachers and students will have different levels of access based on their role.
  
---

## Future Updates:
- **Restricted Course Deletion**: The ability for teachers to delete only their own courses will be implemented in future versions.
- **Improved Course Search**: Enhancements to the course search and filtering options for students will be added to facilitate better course discovery.
  
---

### Running the Application:
1. Clone the repository:
   ```
   git clone <repository_url>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open the application in your browser at `http://localhost:3000`.

---

## Technologies Used:
- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: MongoDB (or other database solution)

---

## Contributing:
We welcome contributions to improve the application. If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a description of the changes.

---

## Contact:
For questions or suggestions, please reach out to the development team at [IT@websitesetup.com].

---

Thank you for using the College Course Enrollment Web Application! We hope it enhances your course registration experience.

