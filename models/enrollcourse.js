import React, { useState, useEffect } from 'react';

function EnrollCourse() {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    const enrollCourse = (courseId) => {
        fetch(`/enroll/${courseId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setMessage(data.message));
    };

    return (
        <div>
            <h1>Enroll in a Course</h1>
            {message && <p>{message}</p>}
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        {course.name} <button onClick={() => enrollCourse(course._id)}>Enroll</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EnrollCourse;