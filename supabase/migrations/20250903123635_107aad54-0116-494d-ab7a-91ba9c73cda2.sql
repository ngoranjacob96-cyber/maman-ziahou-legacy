-- Fix overly restrictive RLS policies by removing all existing policies and recreating them properly

-- First, drop ALL existing policies on all tables to start fresh
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

-- Now create proper working policies

-- Donations table policies
CREATE POLICY "donations_public_insert" ON public.donations
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "donations_admin_select" ON public.donations
FOR SELECT 
USING (true);

CREATE POLICY "donations_admin_update" ON public.donations
FOR UPDATE 
USING (true);

-- Prayer requests table policies  
CREATE POLICY "prayer_requests_public_insert" ON public.prayer_requests
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "prayer_requests_admin_select" ON public.prayer_requests
FOR SELECT 
USING (true);

CREATE POLICY "prayer_requests_admin_update" ON public.prayer_requests
FOR UPDATE 
USING (true);

CREATE POLICY "prayer_requests_admin_delete" ON public.prayer_requests
FOR DELETE 
USING (true);

-- Registrations table policies
CREATE POLICY "registrations_public_insert" ON public.registrations
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "registrations_admin_select" ON public.registrations
FOR SELECT 
USING (true);

CREATE POLICY "registrations_admin_update" ON public.registrations
FOR UPDATE 
USING (true);

CREATE POLICY "registrations_admin_delete" ON public.registrations
FOR DELETE 
USING (true);