-- Temporarily allow public read access to prayer requests for testing
-- This should be replaced with proper admin authentication later
DROP POLICY IF EXISTS "Admin only read access for prayer requests" ON public.prayer_requests;

CREATE POLICY "Temporary public read access for prayer requests" 
ON public.prayer_requests 
FOR SELECT 
USING (true);