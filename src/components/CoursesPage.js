import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';

const CoursesPage = () => {
  // State to store courses fetched from the back end
  const [courses, setCourses] = useState([]);
  // State for enrollments persisted in localStorage
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrollments');
    return saved ? JSON.parse(saved) : [];
  });
  // State to handle any fetch errors
  const [error, setError] = useState(null);

  // Fetch courses from your Flask back end
  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => setCourses(data))
      .catch(err => {
        setError('Error fetching courses.');
        console.error(err);
      });
  }, []);

  // Persist enrollments in localStorage when they change
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Handle course enrollment
  const handleEnroll = (course) => {
    setEnrolledCourses(prev => [
      ...prev, 
      { 
        ...course,
        enrollmentId: Date.now() // Unique ID for each enrollment
      }
    ]);
  };

  // Handle removal of an enrollment
  const handleRemove = (enrollmentId) => {
    setEnrolledCourses(prev => 
      prev.filter(course => course.enrollmentId !== enrollmentId)
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          {error && <div className="error">{error}</div>}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem 
                key={course.id || course.course_id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
        
        <EnrollmentList 
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
