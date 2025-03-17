-- Fix for duplicate key errors
DO $$ 
BEGIN
  -- Insert admin user if not exists
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone)
    VALUES (uuid_generate_v4(), 'admin', 'admin123', 'admin', 'Admin User', 'admin@ppl.edu', '123-456-7890');
  END IF;
  
  -- Insert supervisor users if not exists
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'jsmith') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone)
    VALUES (uuid_generate_v4(), 'jsmith', 'password123', 'supervisor', 'Dr. John Smith', 'jsmith@ppl.edu', '234-567-8901');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'sjohnson') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone)
    VALUES (uuid_generate_v4(), 'sjohnson', 'password123', 'supervisor', 'Prof. Sarah Johnson', 'sjohnson@ppl.edu', '345-678-9012');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'mbrown') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone)
    VALUES (uuid_generate_v4(), 'mbrown', 'password123', 'supervisor', 'Dr. Michael Brown', 'mbrown@ppl.edu', '456-789-0123');
  END IF;
  
  -- Insert student users if not exists
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'student1') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone, student_id, major, semester, address, emergency_contact)
    VALUES (uuid_generate_v4(), 'student1', 'password123', 'student', 'John Student', 'jstudent@ppl.edu', '567-890-1234', 'S12345', 'computer_science', 5, '123 Student St, Campus Area', '678-901-2345');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'student2') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone, student_id, major, semester, address, emergency_contact)
    VALUES (uuid_generate_v4(), 'student2', 'password123', 'student', 'Emily Johnson', 'ejohnson@ppl.edu', '678-901-2345', 'S12346', 'information_systems', 6, '456 Student Ave, Campus Area', '789-012-3456');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'student3') THEN
    INSERT INTO users (id, username, password, role, full_name, email, phone, student_id, major, semester, address, emergency_contact)
    VALUES (uuid_generate_v4(), 'student3', 'password123', 'student', 'Michael Brown', 'mbrown_student@ppl.edu', '789-012-3456', 'S12347', 'physics', 7, '789 Student Blvd, Campus Area', '890-123-4567');
  END IF;
END $$;