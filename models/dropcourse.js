import React, { useState, useEffect } from 'react';

function DropCourse() {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/schedule', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setCourses(data));
    }, []);

    const dropCourse = (courseId) => {
        fetch(`/drop/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
            setCourses(courses.filter(course => course._id !== courseId));
        });
    };

    return (
        <div>
            <h1>Drop a Course</h1>
            {message && <p>{message}</p>}
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

export default DropCourse;