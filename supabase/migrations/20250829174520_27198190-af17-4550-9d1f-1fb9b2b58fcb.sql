-- URGENT: Fix critical security vulnerability - Remove public access to sensitive prayer request data

-- Remove dangerous public policies that expose personal data
DROP POLICY IF EXISTS "Allow public read access for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Allow public update for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Allow public delete for prayer requests" ON public.prayer_requests;

-- Keep only the public insertion policy (needed for prayer request submissions)
-- The "Allow public prayer request insertion" policy should remain

-- Create secure admin-only policies
-- For now, we'll disable read/update/delete until proper authentication is implemented
CREATE POLICY "Admin only read access for prayer requests" 
ON public.prayer_requests 
FOR SELECT 
USING (false); -- Temporarily disabled until authentication is implemented

CREATE POLICY "Admin only update for prayer requests" 
ON public.prayer_requests 
FOR UPDATE 
USING (false); -- Temporarily disabled until authentication is implemented

CREATE POLICY "Admin only delete for prayer requests" 
ON public.prayer_requests 
FOR DELETE 
USING (false); -- Temporarily disabled until authentication is implemented