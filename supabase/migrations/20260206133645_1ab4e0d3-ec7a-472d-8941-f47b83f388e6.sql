-- Add explicit SELECT policy to prevent public reading of contact submissions
-- This ensures sensitive customer data (names, emails, messages) cannot be read by unauthorized users
CREATE POLICY "No public read access to contact submissions"
ON public.contact_submissions
FOR SELECT
USING (false);