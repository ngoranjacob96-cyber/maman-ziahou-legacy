-- MAXIMUM SECURITY FIX: Remove ALL read access to sensitive data until proper authentication is implemented

-- Remove authenticated user access to prayer_requests (too broad)
DROP POLICY IF EXISTS "Authenticated users can read prayer requests" ON public.prayer_requests;

-- Remove authenticated user access to registrations (too broad)  
DROP POLICY IF EXISTS "Authenticated users can read registrations" ON public.registrations;

-- Create ultra-restrictive policies that deny all SELECT access
-- This ensures complete data protection until proper admin roles are implemented
CREATE POLICY "No read access to prayer requests" 
ON public.prayer_requests 
FOR SELECT 
USING (false);

CREATE POLICY "No read access to registrations" 
ON public.registrations 
FOR SELECT 
USING (false);

-- Also secure donations table that was flagged
DROP POLICY IF EXISTS "donations_admin_select" ON public.donations;
DROP POLICY IF EXISTS "Allow admin read access for donations" ON public.donations;

CREATE POLICY "No read access to donations" 
ON public.donations 
FOR SELECT 
USING (false);

-- Keep INSERT policies for public submissions (prayer requests, donations)
-- Keep UPDATE/DELETE policies will be handled when admin authentication is added

-- Add security comments
COMMENT ON POLICY "No read access to prayer requests" ON public.prayer_requests 
IS 'Ultra-secure policy - no read access until proper admin authentication with roles is implemented';

COMMENT ON POLICY "No read access to registrations" ON public.registrations 
IS 'Ultra-secure policy - no read access until proper admin authentication with roles is implemented';

COMMENT ON POLICY "No read access to donations" ON public.donations 
IS 'Ultra-secure policy - no read access until proper admin authentication with roles is implemented';