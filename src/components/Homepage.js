import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Homepage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses from the back end
    fetch('http://localhost:5000/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching courses');
        }
        return response.json();
      })
      .then(data => {
        // Randomize courses and select 3
        const shuffledCourses = [...data].sort(() => 0.5 - Math.random());
        setFeaturedCourses(shuffledCourses.slice(0, 3));
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching courses.');
      });

    // Fetch testimonials from the back end
    fetch('http://localhost:5000/testimonials')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching testimonials');
        }
        return response.json();
      })
      .then(data => {
        // Randomize testimonials and select 2
        const shuffledTestimonials = [...data].sort(() => 0.5 - Math.random());
        setRandomTestimonials(shuffledTestimonials.slice(0, 2));
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching testimonials.');
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* About Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#004080', marginBottom: '15px' }}>About Our LMS</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Welcome to the Learning Management System designed to empower students and educators 
            with cutting-edge online learning tools. Our platform offers structured courses, 
            interactive content, and progress tracking to enhance your learning experience.
          </p>
        </section>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Featured Courses */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#004080', marginBottom: '20px' }}>Featured Courses</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {featuredCourses.map(course => (
              <div key={course.id || course.course_id} style={{
                backgroundColor: '#e6f2ff',
                borderRadius: '10px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={course.image} 
                  alt={course.name} 
                  style={{ 
                    width: '100%', 
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '5px'
                  }}
                />
                <h4 style={{ margin: '10px 0', color: '#003366' }}>{course.name}</h4>
                <p style={{ fontSize: '0.9rem' }}>{course.instructor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h3 style={{ color: '#004080', marginBottom: '20px' }}>Student Testimonials</h3>
          <div style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            {randomTestimonials.map((testimonial, index) => (
              <div key={index} style={{
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ margin: 0 }}>
                    {testimonial.studentName || testimonial.author}
                  </h4>
                  <div style={{ color: '#ffd700' }}>
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', margin: 0 }}>
                  "{testimonial.review || testimonial.comment}"
                </p>
                <p style={{ 
                  marginTop: '10px', 
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  Course: {testimonial.courseName || testimonial.course}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
