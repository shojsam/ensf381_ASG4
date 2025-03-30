import React, { useEffect, useState } from 'react';
import courses from '../data/courses';
import testimonials from '../data/testimonials';

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);

  useEffect(() => {
    // Randomly select 3 courses
    const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
    setFeaturedCourses(shuffledCourses.slice(0, 3));

    // Randomly select 2 testimonials
    const shuffledTestimonials = [...testimonials].sort(() => 0.5 - Math.random());
    setFeaturedTestimonials(shuffledTestimonials.slice(0, 2));
  }, []);

  return (
    <main className="main-section">
      <section className="about">
        <h2>About LMS</h2>
        <p>
          Welcome to our Learning Management System where you can explore courses and enhance your skills.
        </p>
      </section>
      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="course-list">
          {featuredCourses.map(course => (
            <div key={course.id} className="course-card">
              <img src={`/${course.image}`} alt={course.name} />
              <h3>{course.name}</h3>
              <p>{course.instructor}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="testimonials">
        <h2>Testimonials</h2>
        {featuredTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <h4>{testimonial.studentName}</h4>
            <p>{testimonial.review}</p>
            <p>{'★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MainSection;

