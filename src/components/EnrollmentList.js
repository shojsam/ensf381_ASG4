import React, { useEffect, useState } from 'react';
import EnrolledCourse from './EnrolledCourse';

const EnrollmentList = ({ enrolledCourses, onDrop }) => {
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    // Calculate total credit hours
    const total = enrolledCourses.reduce((sum, course) => sum + course.creditHours, 0);
    setTotalCredits(total);
    // Save to local storage
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    // This effect can be used by a parent to initialize state from localStorage if needed.
  }, []);

  return (
    <div className="enrollment-list">
      <h2>Enrollment List</h2>
      {enrolledCourses.map(course => (
        <EnrolledCourse key={course.id} course={course} onDrop={onDrop} />
      ))}
      <h3>Total Credit Hours: {totalCredits}</h3>
    </div>
  );
};

export default EnrollmentList;
