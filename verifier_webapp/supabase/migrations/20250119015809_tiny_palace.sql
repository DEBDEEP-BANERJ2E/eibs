/*
  # Add delete policy for applications

  1. Changes
    - Add policy to allow users to delete their own applications
    - This enables permanent deletion of applications from the database

  2. Security
    - Only authenticated users can delete their own applications
    - Users cannot delete other users' applications
*/

CREATE POLICY "Users can delete their own applications"
  ON applications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);