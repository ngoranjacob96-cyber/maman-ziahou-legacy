-- URGENT SECURITY FIX: Remove public access to sensitive prayer and registration data

-- Drop all public SELECT policies from prayer_requests table
DROP POLICY IF EXISTS "prayer_requests_admin_select" ON public.prayer_requests;
DROP POLICY IF EXISTS "Allow admin read access for prayer requests" ON public.prayer_requests;

-- Drop all public SELECT policies from registrations table  
DROP POLICY IF EXISTS "registrations_admin_select" ON public.registrations;
DROP POLICY IF EXISTS "Allow admin read access for registrations" ON public.registrations;

-- Create secure policies that require authentication
-- Only authenticated users can read prayer requests (will need admin role check later)
CREATE POLICY "Authenticated users can read prayer requests" 
ON public.prayer_requests 
FOR SELECT 
TO authenticated
USING (true);

-- Only authenticated users can read registrations (will need admin role check later)
CREATE POLICY "Authenticated users can read registrations" 
ON public.registrations 
FOR SELECT 
TO authenticated
USING (true);

-- Keep existing INSERT policies for public submissions
-- Keep existing UPDATE/DELETE policies for authenticated users

-- Add comment for future enhancement
COMMENT ON POLICY "Authenticated users can read prayer requests" ON public.prayer_requests 
IS 'Temporary policy - should be restricted to admin role only when authentication is implemented';

COMMENT ON POLICY "Authenticated users can read registrations" ON public.registrations 
IS 'Temporary policy - should be restricted to admin role only when authentication is implemented';