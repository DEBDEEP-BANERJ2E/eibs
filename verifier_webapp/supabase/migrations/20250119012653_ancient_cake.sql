/*
  # Initial Schema for Job Search Application

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `description` (text)
      - `location` (text)
      - `salary_range` (text)
      - `created_at` (timestamp)
    
    - `applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `status` (text)
      - `resume_url` (text)
      - `cover_letter_url` (text)
      - `created_at` (timestamp)
      - `upload_token` (text, unique)

  2. Security
    - Enable RLS on all tables
    - Add policies for job viewing and application management
*/

-- Jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  salary_range text,
  created_at timestamptz DEFAULT now()
);

-- Applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  user_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'pending',
  resume_url text,
  cover_letter_url text,
  created_at timestamptz DEFAULT now(),
  upload_token text UNIQUE DEFAULT gen_random_uuid(),
  UNIQUE(job_id, user_id)
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policies for jobs
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  TO public
  USING (true);

-- Policies for applications
CREATE POLICY "Users can view their own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);