-- Insert admin user
INSERT INTO users (id, username, password, role, full_name, email, phone)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin', 'admin123', 'admin', 'Admin User', 'admin@ppl.edu', '123-456-7890');

-- Insert supervisor users
INSERT INTO users (id, username, password, role, full_name, email, phone)
VALUES
  ('00000000-0000-0000-0000-000000000002', 'jsmith', 'password123', 'supervisor', 'Dr. John Smith', 'jsmith@ppl.edu', '234-567-8901'),
  ('00000000-0000-0000-0000-000000000003', 'sjohnson', 'password123', 'supervisor', 'Prof. Sarah Johnson', 'sjohnson@ppl.edu', '345-678-9012'),
  ('00000000-0000-0000-0000-000000000004', 'mbrown', 'password123', 'supervisor', 'Dr. Michael Brown', 'mbrown@ppl.edu', '456-789-0123');

-- Insert student users
INSERT INTO users (id, username, password, role, full_name, email, phone, student_id, major, semester, address, emergency_contact)
VALUES
  ('00000000-0000-0000-0000-000000000005', 'student1', 'password123', 'student', 'John Student', 'jstudent@ppl.edu', '567-890-1234', 'S12345', 'computer_science', 5, '123 Student St, Campus Area', '678-901-2345'),
  ('00000000-0000-0000-0000-000000000006', 'student2', 'password123', 'student', 'Emily Johnson', 'ejohnson@ppl.edu', '678-901-2345', 'S12346', 'information_systems', 6, '456 Student Ave, Campus Area', '789-012-3456'),
  ('00000000-0000-0000-0000-000000000007', 'student3', 'password123', 'student', 'Michael Brown', 'mbrown_student@ppl.edu', '789-012-3456', 'S12347', 'physics', 7, '789 Student Blvd, Campus Area', '890-123-4567'),
  ('00000000-0000-0000-0000-000000000008', 'student4', 'password123', 'student', 'Sarah Davis', 'sdavis@ppl.edu', '890-123-4567', 'S12348', 'biology', 8, '101 Student Circle, Campus Area', '901-234-5678'),
  ('00000000-0000-0000-0000-000000000009', 'student5', 'password123', 'student', 'Robert Wilson', 'rwilson@ppl.edu', '901-234-5678', 'S12349', 'chemistry', 6, '202 Student Lane, Campus Area', '012-345-6789'),
  ('00000000-0000-0000-0000-000000000010', 'student6', 'password123', 'student', 'Jennifer Lee', 'jlee@ppl.edu', '012-345-6789', 'S12350', 'information_systems', 5, '303 Student Road, Campus Area', '123-456-7890');

-- Insert locations
INSERT INTO locations (id, name, address, capacity, contact_person, contact_email, contact_phone, status)
VALUES
  ('00000000-0000-0000-0000-000000000011', 'City High School', '123 Education St, City Center', 15, 'John Principal', 'principal@cityhs.edu', '123-456-7890', 'active'),
  ('00000000-0000-0000-0000-000000000012', 'Westside Academy', '456 Learning Ave, West District', 10, 'Sarah Director', 'director@westside.edu', '234-567-8901', 'active'),
  ('00000000-0000-0000-0000-000000000013', 'Eastside College', '789 Knowledge Blvd, East District', 12, 'Michael Dean', 'dean@eastside.edu', '345-678-9012', 'active'),
  ('00000000-0000-0000-0000-000000000014', 'North Technical Institute', '101 Tech Road, North Area', 8, 'Emily Director', 'director@northtech.edu', '456-789-0123', 'inactive');

-- Insert supervisors
INSERT INTO supervisors (id, user_id, specialization, max_students, location_id)
VALUES
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000002', 'Mathematics', 5, '00000000-0000-0000-0000-000000000011'),
  ('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000003', 'Computer Science', 5, '00000000-0000-0000-0000-000000000011'),
  ('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000004', 'Physics', 5, '00000000-0000-0000-0000-000000000012');

-- Insert PPL periods
INSERT INTO ppl_periods (id, name, start_date, end_date, status)
VALUES
  ('00000000-0000-0000-0000-000000000018', 'October - December 2023', '2023-10-15', '2023-12-15', 'completed'),
  ('00000000-0000-0000-0000-000000000019', 'January - March 2024', '2024-01-15', '2024-03-15', 'active'),
  ('00000000-0000-0000-0000-000000000020', 'April - June 2024', '2024-04-15', '2024-06-15', 'upcoming'),
  ('00000000-0000-0000-0000-000000000021', 'July - September 2024', '2024-07-15', '2024-09-15', 'upcoming'),
  ('00000000-0000-0000-0000-000000000022', 'October - December 2024', '2024-10-15', '2024-12-15', 'upcoming');

-- Insert student registrations
INSERT INTO student_registrations (id, student_id, period_id, status, transcript_uploaded, id_card_uploaded, photo_uploaded, recommendation_uploaded, agreement_accepted)
VALUES
  ('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000019', 'approved', true, true, true, true, true),
  ('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000019', 'approved', true, true, true, true, true),
  ('00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000019', 'approved', true, true, true, true, true),
  ('00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000018', 'approved', true, true, true, true, true),
  ('00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000018', 'approved', true, true, true, true, true),
  ('00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000020', 'pending', true, true, true, true, true);

-- Insert placements
INSERT INTO placements (id, registration_id, location_id, supervisor_id, status, start_date, end_date, progress)
VALUES
  ('00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000015', 'approved', '2024-01-15', '2024-03-15', 65),
  ('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000016', 'approved', '2024-01-15', '2024-03-15', 40),
  ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000017', 'approved', '2024-01-15', '2024-03-15', 75),
  ('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000015', 'completed', '2023-10-15', '2023-12-15', 100),
  ('00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000017', 'completed', '2023-10-15', '2023-12-15', 100);

-- Insert assessments
INSERT INTO assessments (id, placement_id, supervisor_id, type, teaching_skills, classroom_management, lesson_planning, student_engagement, professional_conduct, overall_performance, strengths, areas_for_improvement, recommendations, status)
VALUES
  ('00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000015', 'midterm', 75, 70, 80, 85, 90, 'good', 'Strong communication skills and good rapport with students.', 'Could improve classroom management techniques.', 'Practice more varied teaching methods.', 'submitted'),
  ('00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000015', 'midterm', 85, 80, 90, 85, 95, 'very_good', 'Excellent lesson planning and student engagement.', 'Could work on time management during lessons.', 'Continue developing interactive teaching methods.', 'submitted'),
  ('00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000015', 'final', 90, 85, 95, 90, 95, 'excellent', 'Outstanding teaching skills and professional conduct.', 'Minor improvements in classroom management.', 'Ready for professional teaching role.', 'submitted'),
  ('00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000017', 'midterm', 80, 75, 85, 80, 90, 'good', 'Good subject knowledge and professional attitude.', 'Could improve student engagement techniques.', 'Try more interactive teaching methods.', 'submitted'),
  ('00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000017', 'final', 85, 80, 90, 85, 95, 'very_good', 'Significant improvement in teaching skills and student engagement.', 'Continue developing classroom management skills.', 'Ready for teaching role with minor supervision.', 'submitted');

-- Insert certificates
INSERT INTO certificates (id, placement_id, certificate_number, issue_date, status, download_url)
VALUES
  ('00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000032', 'PPL-2023-001', '2023-12-20', 'issued', 'https://example.com/certificates/PPL-2023-001.pdf'),
  ('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000033', 'PPL-2023-002', '2023-12-20', 'issued', 'https://example.com/certificates/PPL-2023-002.pdf');