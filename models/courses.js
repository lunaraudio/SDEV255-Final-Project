const express = require('express');
const router = express.Router();
const db = require("./db");
const Course = require('./course'); // Adjust the path as needed
const User = require('./user'); // Adjust the path as needed
const jwt = require('jsonwebtoken');

// Define the Course schema
const courses = db.model("Courses", {
    name: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: String, required: true },
    credits: { type: Number, min: 1, max: 6, required: true }
});

// Middleware to authenticate the user
function authMiddleware(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

// Enroll in a course
router.post('/enroll/:courseId', authMiddleware, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    const student = await User.findById(req.user._id);
    // Add course to student's schedule
    if (!student.enrolledCourses) student.enrolledCourses = [];
    student.enrolledCourses.push(course._id);
    await student.save();
    res.status(200).json({ message: 'Course added to your schedule' });
});

// Drop a course
router.delete('/drop/:courseId', authMiddleware, async (req, res) => {
    const student = await User.findById(req.user._id);
    student.enrolledCourses = student.enrolledCourses.filter(courseId => courseId.toString() !== req.params.courseId);
    await student.save();
    res.status(200).json({ message: 'Course dropped from your schedule' });
});

// Get student's schedule
router.get('/schedule', authMiddleware, async (req, res) => {
    const student = await User.findById(req.user._id).populate('enrolledCourses');
    res.status(200).json(student.enrolledCourses);
});

module.exports = router;