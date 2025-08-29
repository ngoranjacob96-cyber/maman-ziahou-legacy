-- Create edge function for AI chat
CREATE OR REPLACE FUNCTION get_openai_chat()
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'Edge function will be created separately';
END;
$$;