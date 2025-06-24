import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCMS } from '@/contexts/CMSContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabaseClient';

interface PageManagerProps {
  onNavigate?: (pageId: string) => void;
}

export const PageManager: React.FC<PageManagerProps> = ({ onNavigate }) => {
  const { pages, deletePage, fetchPages } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || page.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Borrador';
      case 'review': return 'En Revisión';
      default: return status;
    }
  };

  const handleDeletePage = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta página?')) {
      deletePage(id);
    }
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = newSlug.trim() || `pagina-${Date.now()}`;
    const title = newTitle.trim() || 'Nueva Página';

    const pageData = {
      title,
      slug,
      status: 'draft',
      author: 'Admin',
      views: 0,
      lastModified: new Date().toISOString().split('T')[0],
      content: JSON.stringify({
        elements: [],
        layout: 'tv',
        version: '1.0'
      })
    };

    const { data, error } = await supabase
      .from('pages')
      .insert([pageData])
      .select('id')
      .single();

    if (error) {
      console.error('❌ Error al crear página:', error.message);
      return;
    }

    await fetchPages();
    setShowModal(false);
    setNewTitle('');
    setNewSlug('');

    if (onNavigate && data?.id) {
      onNavigate(data.id);
    }
  };

  return (
    <>
      {/* ✅ Modal de Nueva Página */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Página</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePage} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Título</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Mi nueva página"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Slug (opcional)</label>
              <Input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="ej: pagina-inicial"
              />
            </div>
            <Button type="submit" className="w-full">Crear Página</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 🔧 Página principal */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Gestión de Páginas</h2>
            <p className="text-gray-600">Administra todas las páginas de tu sitio web</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nueva Página
          </Button>
        </div>

        {/* 🔍 Filtros */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar páginas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'published', 'draft', 'review'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(status)}
                >
                  {status === 'all' ? 'Todas' : getStatusText(status)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* 📋 Tabla de páginas */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold">Título</th>
                  <th className="text-left p-4 font-semibold">Estado</th>
                  <th className="text-left p-4 font-semibold">Autor</th>
                  <th className="text-left p-4 font-semibold">Última Modificación</th>
                  <th className="text-left p-4 font-semibold">Vistas</th>
                  <th className="text-right p-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-gray-500">/{page.slug}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(page.status)}>
                        {getStatusText(page.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{page.author}</td>
                    <td className="p-4 text-gray-600">{page.lastModified}</td>
                    <td className="p-4 text-gray-600">{page.views.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onNavigate?.(page.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Duplicar</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeletePage(page.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};
