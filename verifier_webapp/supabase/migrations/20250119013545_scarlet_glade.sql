/*
  # Update jobs table schema

  1. Changes
    - Add new columns to jobs table:
      - deadline (timestamptz)
      - domain (text)
      - company_logo (text)
      - featured (boolean)
    - Add sample jobs data
*/

-- Add new columns
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS deadline timestamptz;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS domain text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS company_logo text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Insert sample data with proper UUIDs
INSERT INTO jobs (id, title, company, description, location, salary_range, deadline, domain, company_logo, featured)
VALUES
  ('123e4567-e89b-12d3-a456-426614174000', 'Senior Full Stack Developer', 'TechCorp Solutions', 'We are looking for an experienced Full Stack Developer...', 'San Francisco, CA', '$120,000 - $180,000', '2024-02-15', 'Software Development', 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop', true),
  ('123e4567-e89b-12d3-a456-426614174001', 'AI Research Scientist', 'Neural Dynamics', 'Join our team of AI researchers...', 'Boston, MA', '$150,000 - $200,000', '2024-02-20', 'Artificial Intelligence', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=128&h=128&fit=crop', true),
  ('123e4567-e89b-12d3-a456-426614174002', 'UX/UI Designer', 'Creative Minds Inc', 'Design beautiful and intuitive interfaces...', 'Remote', '$90,000 - $130,000', '2024-02-18', 'Design', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop', false),
  ('123e4567-e89b-12d3-a456-426614174003', 'DevOps Engineer', 'Cloud Systems Pro', 'Help us build and maintain our cloud infrastructure...', 'Seattle, WA', '$130,000 - $170,000', '2024-02-25', 'DevOps', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop', false),
  ('123e4567-e89b-12d3-a456-426614174004', 'Product Manager', 'Innovation Hub', 'Lead product development and strategy...', 'New York, NY', '$110,000 - $160,000', '2024-02-22', 'Product Management', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=128&h=128&fit=crop', true)
ON CONFLICT (id) DO NOTHING;