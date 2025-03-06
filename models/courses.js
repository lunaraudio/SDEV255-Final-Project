const db = require("./db")

const courses = db.model("Courses", {
    name: {type:String, required:true},
    description: {type:String, required:true},
    teacher: {type:String, required:true},
    credits: {type:Number, min:1, max:6, required:true}
});

// Enroll in a course
router.post('/enroll/:courseId', async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    const student = await User.findById(req.user._id);
    // Add course to student's schedule
    if (!student.enrolledCourses) student.enrolledCourses = [];
    student.enrolledCourses.push(course._id);
    await student.save();
    res.status(200).json({ message: 'Course added to your schedule' });
});

// Drop a course
router.delete('/drop/:courseId', async (req, res) => {
    const student = await User.findById(req.user._id);
    student.enrolledCourses = student.enrolledCourses.filter(courseId => courseId !== req.params.courseId);
    await student.save();
    res.status(200).json({ message: 'Course dropped from your schedule' });
});

// Frontend (Student Views)  

// Schedule.js (Student's enrolled courses)
import React, { useState, useEffect } from 'react';
function Schedule() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('/student/schedule')
            .then((response) => response.json())
            .then((data) => setCourses(data));
    }, []);

      const dropCourse = (courseId) => {
          fetch(`/student/drop/${courseId}`, {
              method: 'DELETE',
          }).then(() => setCourses(courses.filter(course => course._id !== courseId)));
      };
    return (
        <div>
        <h1>Your Schedule</h1>
        <ul>
        {courses.map(course => (
            <li key={course._id}>
            {course.name} <button onClick={() => dropCourse(course._id)}>Drop</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) { 
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}


export default Schedule;


    


module.exports = courses;
