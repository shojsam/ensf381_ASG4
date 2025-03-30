import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseCatalog from './CourseCatalog';
import EnrollmentList from './EnrollmentList';

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (course) => {
    // For this example, assign a fixed credit hour value (e.g., 3)
    const creditHours = 3;
    const alreadyEnrolled = enrolledCourses.find(c => c.id === course.id);
    if (!alreadyEnrolled) {
      setEnrolledCourses([...enrolledCourses, { ...course, creditHours }]);
    }
  };

  const handleDrop = (courseId) => {
    const updated = enrolledCourses.filter(course => course.id !== courseId);
    setEnrolledCourses(updated);
  };

  // Load enrollment data from localStorage on mount
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('enrolledCourses'));
    if (savedCourses) {
      setEnrolledCourses(savedCourses);
    }
  }, []);

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={handleEnroll} />
        <EnrollmentList enrolledCourses={enrolledCourses} onDrop={handleDrop} />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
