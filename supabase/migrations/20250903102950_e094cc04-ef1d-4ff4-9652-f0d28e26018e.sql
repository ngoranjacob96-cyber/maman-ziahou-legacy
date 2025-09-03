-- Create donations table to track donation activities
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  amount INTEGER, -- Amount if provided (in cents)
  status TEXT DEFAULT 'clicked', -- clicked, completed, failed
  paystack_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow public insertion for donation tracking
CREATE POLICY "Allow public donation tracking" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Admin read access for donations
CREATE POLICY "Admin only read access for donations" 
ON public.donations 
FOR SELECT 
USING (false);

-- Admin update access for donations
CREATE POLICY "Admin only update for donations" 
ON public.donations 
FOR UPDATE 
USING (false);

-- Add trigger for updated_at
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();