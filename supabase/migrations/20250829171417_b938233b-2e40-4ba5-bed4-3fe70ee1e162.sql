-- Create prayer requests table
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  prayer_subject TEXT NOT NULL,
  prayer_request TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'prayed_for', 'answered')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for prayer requests
CREATE POLICY "Enable public prayer request submission" 
ON public.prayer_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin only read access for prayer requests" 
ON public.prayer_requests 
FOR SELECT 
USING (false);

CREATE POLICY "Admin only update for prayer requests" 
ON public.prayer_requests 
FOR UPDATE 
USING (false);

CREATE POLICY "Admin only delete for prayer requests" 
ON public.prayer_requests 
FOR DELETE 
USING (false);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_prayer_requests_updated_at
BEFORE UPDATE ON public.prayer_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();