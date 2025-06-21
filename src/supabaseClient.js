import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kxgvlgecatlbdekjvmvm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Z3ZsZ2VjYXRsYmRla2p2bXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTM1MDMsImV4cCI6MjA2NTkyOTUwM30.PliXak0A-5xrhbeSgFA0SFtTaOew2kJbQ-rahW50Yz8'
);

export default supabase;