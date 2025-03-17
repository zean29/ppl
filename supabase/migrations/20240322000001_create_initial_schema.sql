-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'supervisor', 'admin')),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  student_id TEXT,
  major TEXT,
  semester INTEGER,
  emergency_contact TEXT
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes TEXT
);

-- Create supervisors table
CREATE TABLE IF NOT EXISTS supervisors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES users(id),
  specialization TEXT NOT NULL,
  max_students INTEGER NOT NULL,
  location_id UUID REFERENCES locations(id)
);

-- Create ppl_periods table
CREATE TABLE IF NOT EXISTS ppl_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed'))
);

-- Create student_registrations table
CREATE TABLE IF NOT EXISTS student_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  student_id UUID NOT NULL REFERENCES users(id),
  period_id UUID NOT NULL REFERENCES ppl_periods(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  transcript_uploaded BOOLEAN NOT NULL DEFAULT FALSE,
  id_card_uploaded BOOLEAN NOT NULL DEFAULT FALSE,
  photo_uploaded BOOLEAN NOT NULL DEFAULT FALSE,
  recommendation_uploaded BOOLEAN NOT NULL DEFAULT FALSE,
  agreement_accepted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create placements table
CREATE TABLE IF NOT EXISTS placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  registration_id UUID NOT NULL REFERENCES student_registrations(id),
  location_id UUID NOT NULL REFERENCES locations(id),
  supervisor_id UUID NOT NULL REFERENCES supervisors(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  start_date DATE,
  end_date DATE,
  progress INTEGER NOT NULL DEFAULT 0
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  placement_id UUID NOT NULL REFERENCES placements(id),
  supervisor_id UUID NOT NULL REFERENCES supervisors(id),
  type TEXT NOT NULL CHECK (type IN ('midterm', 'final')),
  teaching_skills INTEGER NOT NULL,
  classroom_management INTEGER NOT NULL,
  lesson_planning INTEGER NOT NULL,
  student_engagement INTEGER NOT NULL,
  professional_conduct INTEGER NOT NULL,
  overall_performance TEXT NOT NULL,
  strengths TEXT NOT NULL,
  areas_for_improvement TEXT NOT NULL,
  recommendations TEXT NOT NULL,
  additional_comments TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted'))
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  placement_id UUID NOT NULL REFERENCES placements(id),
  certificate_number TEXT NOT NULL,
  issue_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'issued')),
  download_url TEXT
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE locations;
ALTER PUBLICATION supabase_realtime ADD TABLE supervisors;
ALTER PUBLICATION supabase_realtime ADD TABLE ppl_periods;
ALTER PUBLICATION supabase_realtime ADD TABLE student_registrations;
ALTER PUBLICATION supabase_realtime ADD TABLE placements;
ALTER PUBLICATION supabase_realtime ADD TABLE assessments;
ALTER PUBLICATION supabase_realtime ADD TABLE certificates;