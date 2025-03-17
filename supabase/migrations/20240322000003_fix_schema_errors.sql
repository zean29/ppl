-- Fix for realtime publication errors
DO $$ 
BEGIN
  -- Only add tables to realtime publication if they don't already exist
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'users') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE users;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'locations') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE locations;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'supervisors') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE supervisors;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'ppl_periods') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE ppl_periods;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'student_registrations') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE student_registrations;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'placements') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE placements;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'assessments') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE assessments;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'certificates') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE certificates;
  END IF;
END $$;