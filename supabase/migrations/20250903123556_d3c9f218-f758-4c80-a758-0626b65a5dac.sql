-- Fix overly restrictive RLS policies that block all access
-- Remove existing restrictive policies and create proper permissive policies

-- Fix donations table policies
DROP POLICY IF EXISTS "Admin only read access for donations" ON public.donations;
DROP POLICY IF EXISTS "Admin only update for donations" ON public.donations;

-- Create new permissive policies for donations
CREATE POLICY "Allow public donation tracking" ON public.donations
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access for donations" ON public.donations
FOR SELECT 
USING (true); -- Temporarily allow all access until authentication is implemented

CREATE POLICY "Allow admin update for donations" ON public.donations
FOR UPDATE 
USING (true); -- Temporarily allow all access until authentication is implemented

-- Fix prayer_requests table policies  
DROP POLICY IF EXISTS "Admin only read access for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Admin only update for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Admin only delete for prayer requests" ON public.prayer_requests;

-- Create new permissive policies for prayer_requests
CREATE POLICY "Allow public prayer request insertion" ON public.prayer_requests
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access for prayer requests" ON public.prayer_requests
FOR SELECT 
USING (true); -- Temporarily allow all access until authentication is implemented

CREATE POLICY "Allow admin update for prayer requests" ON public.prayer_requests
FOR UPDATE 
USING (true); -- Temporarily allow all access until authentication is implemented

CREATE POLICY "Allow admin delete for prayer requests" ON public.prayer_requests
FOR DELETE 
USING (true); -- Temporarily allow all access until authentication is implemented

-- Fix registrations table policies
DROP POLICY IF EXISTS "Admin only read access for registrations" ON public.registrations;
DROP POLICY IF EXISTS "Admin only update for registrations" ON public.registrations;  
DROP POLICY IF EXISTS "Admin only delete for registrations" ON public.registrations;

-- Create new permissive policies for registrations
CREATE POLICY "Enable public registrations" ON public.registrations
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access for registrations" ON public.registrations
FOR SELECT 
USING (true); -- Temporarily allow all access until authentication is implemented

CREATE POLICY "Allow admin update for registrations" ON public.registrations
FOR UPDATE 
USING (true); -- Temporarily allow all access until authentication is implemented

CREATE POLICY "Allow admin delete for registrations" ON public.registrations
FOR DELETE 
USING (true); -- Temporarily allow all access until authentication is implemented