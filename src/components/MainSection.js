import { useEffect, useState } from 'react';

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses from the back end
    fetch('http://localhost:5000/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses.');
        }
        return response.json();
      })
      .then(data => {
        // Randomize and select 3 courses
        const randomizedCourses = [...data].sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedCourses(randomizedCourses);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
        setError("Error fetching courses data.");
      });
      
    // Fetch testimonials from the back end
    fetch('http://localhost:5000/testimonials')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials.');
        }
        return response.json();
      })
      .then(data => {
        // Randomize and select 2 testimonials
        const randomizedTestimonials = [...data].sort(() => 0.5 - Math.random()).slice(0, 2);
        setRandomTestimonials(randomizedTestimonials);
      })
      .catch(err => {
        console.error("Error fetching testimonials:", err);
        setError("Error fetching testimonials data.");
      });
  }, []);

  return (
    <main>
      <section className="about">
        <h2>About LMS</h2>
        <p>Manage courses and track progress efficiently.</p>
      </section>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section className="featured-courses">
        <h3>Featured Courses</h3>
        {featuredCourses.map(course => (
          <div key={course.id || course.course_id}>
            <img src={course.image} alt={course.name} />
            <h4>{course.name}</h4>
          </div>
        ))}
      </section>

      <section className="testimonials">
        <h3>Student Testimonials</h3>
        {randomTestimonials.map((testimonial, idx) => (
          <div key={idx}>
            {/* Adjust these properties based on your testimonial JSON structure */}
            <p>{testimonial.studentName || testimonial.author}</p>
            <p>{'★'.repeat(testimonial.rating)}</p>
            <p>{testimonial.review || testimonial.comment}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MainSection;
