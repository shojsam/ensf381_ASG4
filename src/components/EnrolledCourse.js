import React from 'react';

const EnrolledCourse = ({ course, onDrop }) => {
  return (
    <div className="enrolled-course">
      <h4>{course.name}</h4>
      <p>Credit Hours: {course.creditHours}</p>
      <button onClick={() => onDrop(course.id)}>Drop Course</button>
    </div>
  );
};

export default EnrolledCourse;
