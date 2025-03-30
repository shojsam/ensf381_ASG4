import React from 'react';
import courses from '../data/courses';
import CourseItem from './CourseItem';

const CourseCatalog = ({ onEnroll }) => {
  return (
    <div className="course-catalog">
      {courses.map(course => (
        <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
      ))}
    </div>
  );
};

export default CourseCatalog;
