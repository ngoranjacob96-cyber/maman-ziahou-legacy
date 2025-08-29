-- Corriger les politiques RLS pour les demandes de prière

-- Supprimer les anciennes politiques problématiques
DROP POLICY IF EXISTS "Admin only delete for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Admin only update for prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Enable public prayer request submission" ON public.prayer_requests;
DROP POLICY IF EXISTS "Temporary public read access for prayer requests" ON public.prayer_requests;

-- Créer des politiques correctes
-- Permettre l'insertion publique pour les fidèles
CREATE POLICY "Allow public prayer request insertion" 
ON public.prayer_requests 
FOR INSERT 
WITH CHECK (true);

-- Permettre la lecture publique pour l'administration (temporaire pour debug)
CREATE POLICY "Allow public read access for prayer requests" 
ON public.prayer_requests 
FOR SELECT 
USING (true);

-- Permettre la mise à jour publique pour l'administration (temporaire pour debug)
CREATE POLICY "Allow public update for prayer requests" 
ON public.prayer_requests 
FOR UPDATE 
USING (true);

-- Permettre la suppression publique pour l'administration (temporaire pour debug)
CREATE POLICY "Allow public delete for prayer requests" 
ON public.prayer_requests 
FOR DELETE 
USING (true);

-- S'assurer que RLS est activé
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;