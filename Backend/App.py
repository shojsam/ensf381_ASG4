from flask import Flask, request, jsonify
import json, random
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory data storage for registered students
students = []

# Load courses and testimonials data from JSON files
base_dir = os.path.dirname(os.path.abspath(__file__))

courses_path = os.path.join(base_dir, 'courses.json')
testimonials_path = os.path.join(base_dir, 'testimonials.json')

with open(courses_path, 'r') as f:
    courses = json.load(f)

with open(testimonials_path, 'r') as f:
    testimonials = json.load(f)

def generate_student_id():
    return len(students) + 1

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    if any(student['username'] == username for student in students):
        return jsonify({'message': 'Username already taken.'}), 400
    new_student = {
        'id': generate_student_id(),
        'username': username,
        'password': data.get('password'),
        'email': data.get('email'),
        'enrolled_courses': []
    }
    students.append(new_student)
    return jsonify({'message': 'Registration successful.'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    for student in students:
        if student['username'] == username and student['password'] == password:
            return jsonify({'message': 'Login successful.', 'student_id': student['id']}), 200
    return jsonify({'message': 'Invalid credentials.'}), 400

@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    if len(testimonials) < 2:
        selected = testimonials
    else:
        selected = random.sample(testimonials, 2)
    return jsonify(selected), 200

@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    course_id = data.get('course_id')
    for student in students:
        if student['id'] == student_id:
            if course_id in [course.get('course_id') for course in student['enrolled_courses']]:
                return jsonify({'message': 'Already enrolled in course.'}), 400
            student['enrolled_courses'].append(data)
            return jsonify({'message': 'Enrolled successfully.'}), 200
    return jsonify({'message': 'Student not found.'}), 404

@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get('course_id')
    for student in students:
        if student['id'] == student_id:
            updated_courses = [course for course in student['enrolled_courses'] if course.get('course_id') != course_id]
            if len(updated_courses) == len(student['enrolled_courses']):
                return jsonify({'message': 'Course not found in enrollment.'}), 400
            student['enrolled_courses'] = updated_courses
            return jsonify({'message': 'Course dropped successfully.'}), 200
    return jsonify({'message': 'Student not found.'}), 404

@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses), 200

@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses']), 200
    return jsonify([]), 200

if __name__ == '__main__':
    app.run(debug=True)
