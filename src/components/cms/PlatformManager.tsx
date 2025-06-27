import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Tv, Calendar, User, Lock, Building, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useCMS } from '@/contexts/CMSContext';
import { HotelSelect } from "@/components/HotelSelect";

interface Platform {
  id: string;
  name: string;
  hotel: string;
  room: string;
  username: string;
  password: string;
  cutoff_date: string;
  status: 'active' | 'expired' | 'pending';
}

const platformOptions = [
  'Netflix', 'Amazon Prime Video', 'Disney+', 'HBO Max',
  'Hulu', 'Apple TV+', 'Paramount+', 'Peacock', 'Discovery+', 'YouTube Premium'
];

export const PlatformManager: React.FC = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [formData, setFormData] = useState<Omit<Platform, 'id' | 'status'>>({
    name: '',
    hotel: '',
    room: '',
    username: '',
    password: '',
    cutoff_date: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const { hotels } = useCMS();

  const fetchPlatforms = async () => {
    const { data, error } = await supabase.from('platforms').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Error al cargar plataformas', description: error.message, variant: 'destructive' });
    } else {
      setPlatforms(data as Platform[]);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const calculateStatus = (cutoff: string): Platform['status'] => {
    const today = new Date();
    const cutoffDate = new Date(cutoff);
    return cutoffDate < today ? 'expired' : 'active';
  };

  const validateForm = () => {
    const required = ['name', 'hotel', 'room', 'username', 'password', 'cutoff_date'] as const;
    for (const key of required) {
      if (!formData[key].trim()) {
        toast({
          title: 'Campo obligatorio',
          description: `Debes completar el campo: ${key}`,
          variant: 'destructive'
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const status = calculateStatus(formData.cutoff_date);
    if (editingId) {
      const { error } = await supabase.from('platforms').update({ ...formData, status }).eq('id', editingId);
      if (error) {
        toast({ title: 'Error actualizando', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Actualizado', description: 'Plataforma actualizada correctamente' });
        fetchPlatforms();
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from('platforms').insert([{ ...formData, status }]);
      if (error) {
        toast({ title: 'Error creando', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Creado', description: 'Plataforma agregada correctamente' });
        fetchPlatforms();
        setIsDialogOpen(false);
      }
    }
    setFormData({
      name: '', hotel: '', room: '', username: '', password: '', cutoff_date: ''
    });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('platforms').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error eliminando', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Eliminada', description: 'Plataforma eliminada correctamente' });
      fetchPlatforms();
    }
  };

  const getStatusBadge = (status: Platform['status']) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Plataformas</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Plataforma
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar' : 'Nueva'} Plataforma</DialogTitle>
              <DialogDescription>Completa los campos requeridos</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Plataforma *
                </Label>
                <div className="col-span-3">
                  <Select value={formData.name} onValueChange={(value) => setFormData({ ...formData, name: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Hotel *
                </Label>
                <div className="col-span-3">
                  <Select
                    value={formData.hotel}
                    onValueChange={(value) => setFormData({ ...formData, hotel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un hotel" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotels.map((hotel) => (
                        <SelectItem key={hotel.id} value={hotel.nombre}>
                          {hotel.nombre}
                        </SelectItem>
                      ))}

                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Habitación *
                </Label>
                <div className="col-span-3">
                  <Input
                    placeholder="Habitación"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Usuario *
                </Label>
                <div className="col-span-3">
                  <Input
                    placeholder="Usuario"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Contraseña *
                </Label>
                <div className="col-span-3">
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Fecha de Corte
                </Label>
                <div className="col-span-3">
                  <Input
                    type="date"
                    value={formData.cutoff_date}
                    onChange={(e) => setFormData({ ...formData, cutoff_date: e.target.value })}
                  />
                </div>

              </div>

            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSubmit}>{editingId ? 'Actualizar' : 'Crear'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plataformas registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Habitación</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead>Fecha Corte</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.hotel}</TableCell>
                  <TableCell>{p.room}</TableCell>
                  <TableCell>{p.username}</TableCell>
                  <TableCell>
                    {showPasswords[p.id] ? p.password : '••••••••'}
                    <Button variant="ghost" size="sm" onClick={() =>
                      setShowPasswords(prev => ({ ...prev, [p.id]: !prev[p.id] }))
                    }>
                      {showPasswords[p.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>{p.cutoff_date}</TableCell>
                  <TableCell>{getStatusBadge(p.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => {
                      setEditingId(p.id);
                      setFormData({
                        name: p.name,
                        hotel: p.hotel,
                        room: p.room,
                        username: p.username,
                        password: p.password,
                        cutoff_date: p.cutoff_date
                      });
                      setIsDialogOpen(true);
                    }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
