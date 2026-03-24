
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Create a more restrictive insert policy that validates required fields are not empty
CREATE POLICY "Anyone can submit contact form with valid data"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  length(name) > 0 AND
  length(email) > 0 AND
  length(message) > 0
);
