-- Fix overly restrictive RLS policies by dropping and recreating all policies
-- This ensures we remove all restrictive policies with 'false' conditions

-- First, drop ALL existing policies for all three tables
DROP POLICY IF EXISTS "Admin only read access for donations" ON public.donations;
DROP POLICY IF EXISTS "Admin only update for donations" ON public.donations;
DROP POLICY IF EXISTS "Allow public donation tracking" ON public.donations;

DROP POLICY IF EXISTS "Admin only read access for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Admin only update for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Admin only delete for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Allow public prayer request insertion" ON public.prayer_requests;

DROP POLICY IF EXISTS "Admin only read access for registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admin only update for registrations" ON public.registrations;  
DROP POLICY IF EXISTS "Admin only delete for registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable public registrations" ON public.registrations;
DROP POLICY IF EXISTS "Limited public registration insertion" ON public.registrations;

-- Now create proper working policies for donations
CREATE POLICY "Allow public donation tracking" ON public.donations
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access for donations" ON public.donations
FOR SELECT 
USING (true); -- Temporarily open until authentication is implemented

CREATE POLICY "Allow admin update for donations" ON public.donations
FOR UPDATE 
USING (true); -- Temporarily open until authentication is implemented

-- Create proper working policies for prayer_requests
CREATE POLICY "Allow public prayer request insertion" ON public.prayer_requests
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access for prayer requests" ON public.prayer_requests
FOR SELECT 
USING (true); -- Temporarily open until authentication is implemented

CREATE POLICY "Allow admin update for prayer requests" ON public.prayer_requests
FOR UPDATE 
USING (true); -- Temporarily open until authentication is implemented

CREATE POLICY "Allow admin delete for prayer requests" ON public.prayer_requests
FOR DELETE 
USING (true); -- Temporarily open until authentication is implemented

-- Create proper working policies for registrations
CREATE POLICY "Allow public registrations" ON public.registrations
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access for registrations" ON public.registrations
FOR SELECT 
USING (true); -- Temporarily open until authentication is implemented

CREATE POLICY "Allow admin update for registrations" ON public.registrations
FOR UPDATE 
USING (true); -- Temporarily open until authentication is implemented

CREATE POLICY "Allow admin delete for registrations" ON public.registrations
FOR DELETE 
USING (true); -- Temporarily open until authentication is implemented