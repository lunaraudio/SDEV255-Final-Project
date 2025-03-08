import React, { useState, useEffect } from 'react';

function Schedule() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/schedule', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setCourses(data));
    }, []);

    return (
        <div>
            <h1>Your Schedule</h1>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        {course.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Schedule;