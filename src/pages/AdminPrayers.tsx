import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Phone, Mail, Heart, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  prayer_subject: string;
  prayer_request: string;
  is_urgent: boolean;
  status: 'new' | 'prayed_for' | 'answered';
  created_at: string;
  updated_at: string;
}

export default function AdminPrayers() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prayers:', error);
        // Check if it's an RLS policy violation (no access due to security restrictions)
        if (error.code === 'PGRST116' || error.message?.includes('row-level security')) {
          toast({
            title: "🔒 Accès sécurisé requis",
            description: "L'accès aux demandes de prière a été sécurisé. Vous devez implémenter l'authentification pour accéder à cette page d'administration.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erreur",
            description: "Impossible de charger les demandes de prière. Vérifiez vos permissions.",
            variant: "destructive"
          });
        }
      } else {
        setPrayers((data as PrayerRequest[]) || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePrayerStatus = async (id: string, newStatus: PrayerRequest['status']) => {
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut.",
          variant: "destructive"
        });
      } else {
        setPrayers(prev => 
          prev.map(prayer => 
            prayer.id === id ? { ...prayer, status: newStatus } : prayer
          )
        );
        toast({
          title: "Statut mis à jour",
          description: "Le statut de la demande de prière a été mis à jour.",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'prayed_for': return 'bg-yellow-500';
      case 'answered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Nouvelle';
      case 'prayed_for': return 'Prière faite';
      case 'answered': return 'Exaucée';
      default: return 'Inconnue';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des demandes de prière...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Administration - Demandes de Prière</h1>
          <p className="text-muted-foreground text-center">
            Gestion des demandes de prière reçues - Total: {prayers.length}
          </p>
        </div>

        {prayers.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucune demande de prière</h3>
            <p className="text-muted-foreground">Les demandes apparaîtront ici une fois soumises.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prayers.map((prayer) => (
              <Card key={prayer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{prayer.prayer_subject}</CardTitle>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(prayer.status)}>
                        {getStatusText(prayer.status)}
                      </Badge>
                      {prayer.is_urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{format(new Date(prayer.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{prayer.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${prayer.email}`} className="text-primary hover:underline">
                        {prayer.email}
                      </a>
                    </div>
                    
                    {prayer.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${prayer.phone}`} className="text-primary hover:underline">
                          {prayer.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm line-clamp-4">{prayer.prayer_request}</p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {prayer.status === 'new' && (
                      <Button
                        size="sm"
                        onClick={() => updatePrayerStatus(prayer.id, 'prayed_for')}
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        Marquer comme priée
                      </Button>
                    )}
                    
                    {prayer.status === 'prayed_for' && (
                      <Button
                        size="sm"
                        onClick={() => updatePrayerStatus(prayer.id, 'answered')}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Marquer comme exaucée
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}