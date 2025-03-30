import React, { useState } from 'react';
import image from '../images/course1.jpg'; 
const CourseItem = ({ course, onEnroll }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div 
      className="course-item" 
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={image} alt={course.name} />
      <h3>{course.name}</h3>
      <p>{course.instructor}</p>
      {showDescription && <p className="description">{course.description}</p>}
      <button onClick={() => onEnroll(course)}>Enroll Now</button>
    </div>
  );
};

export default CourseItem;
