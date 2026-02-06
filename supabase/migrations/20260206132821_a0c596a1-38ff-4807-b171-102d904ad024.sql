-- Add length constraints to contact_submissions table for server-side validation
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_length CHECK (length(name) <= 100),
  ADD CONSTRAINT contact_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT contact_message_length CHECK (length(message) <= 5000);