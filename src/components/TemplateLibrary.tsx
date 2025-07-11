
import React, { useState } from 'react';
import { TemplateData } from './AndroidTVSimulator';
import { defaultTVTemplates, TVTemplate } from '../templates/tvTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Plus, Trash2, Edit, Copy, Save, FileImage,
    ChevronLeft, ChevronRight, RotateCcw
} from 'lucide-react';

interface TemplateLibraryProps {
    currentTemplate: TemplateData;
    onLoadTemplate: (template: TemplateData) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
    currentTemplate,
    onLoadTemplate
}) => {
    const [templates, setTemplates] = useState<TVTemplate[]>(defaultTVTemplates);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const saveCurrentAsTemplate = () => {
        if (!newTemplateName.trim()) return;

        const newTemplate: TVTemplate = {
            id: Date.now().toString(),
            name: newTemplateName,
            description: 'Custom Template',
            data: currentTemplate,
            thumbnail: currentTemplate.backgroundImage,
            createdAt: new Date()
        };

        setTemplates(prev => [...prev, newTemplate]);
        setNewTemplateName('');
    };

    const loadTemplate = (template: TVTemplate) => {
        // Ensure all properties are compatible with TemplateData interface
        const templateData: TemplateData = {
            logo: template.data.logo,
            backgroundImage: template.data.backgroundImage,
            cards: {
                welcome: {
                    ...template.data.cards.welcome,
                    position: template.data.cards.welcome.position || 'center' as 'left' | 'center' | 'right'
                },
                flights: {
                    ...template.data.cards.flights,
                    position: template.data.cards.flights.position || 'center' as 'left' | 'center' | 'right'
                },
                hotel: {
                    ...template.data.cards.hotel,
                    position: template.data.cards.hotel.position || 'center' as 'left' | 'center' | 'right'
                },
                menu: {
                    ...template.data.cards.menu,
                    position: template.data.cards.menu.position || 'center' as 'left' | 'center' | 'right'
                },
                discover: {
                    ...template.data.cards.discover,
                    position: template.data.cards.discover.position || 'center' as 'left' | 'center' | 'right'
                }
            },
            apps: {
                ...template.data.apps
            },
            weather: {
                ...template.data.weather
            },
            time: {
                enabled: template.data.time?.enabled ?? true,
                format: template.data.time?.format ?? '24h'
            }
        };

        onLoadTemplate(templateData);
        setSelectedTemplate(template.id);
    };

    const duplicateTemplate = (template: TVTemplate) => {
        const duplicated: TVTemplate = {
            ...template,
            id: Date.now().toString(),
            name: `${template.name} (Copy)`,
            createdAt: new Date()
        };

        setTemplates(prev => [...prev, duplicated]);
    };

    const deleteTemplate = (templateId: string) => {
        if (templates.length <= 1) return; // Keep at least one template
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        if (selectedTemplate === templateId) {
            setSelectedTemplate(null);
        }
    };

    const resetToNormalMode = () => {
        // Cargar el primer template por defecto
        if (templates.length > 0) {
            loadTemplate(templates[0]);
        }
    };

    return (
        <div className="space-y-4">
            {/* Botón para volver al modo normal */}
            <div className="p-4 border rounded-lg bg-background">
                <Button
                    onClick={resetToNormalMode}
                    variant="outline"
                    className="w-full"
                >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Volver al Modo Template Normal
                </Button>
            </div>

            {/* Save current template */}
            <div className="space-y-3 p-4 border rounded-lg bg-background">
                <h4 className="font-medium text-sm">Guardar Plantilla Actual</h4>
                <div className="flex gap-2">
                    <Input
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="Nombre de la plantilla"
                        className="h-8 text-xs"
                    />
                    <Button
                        size="sm"
                        onClick={saveCurrentAsTemplate}
                        disabled={!newTemplateName.trim()}
                        className="h-8"
                    >
                        <Save className="h-3 w-3 mr-1" />
                        Guardar
                    </Button>
                </div>
            </div>

            {/* Template gallery */}
            <div className="space-y-3">
                <h4 className="font-medium text-sm">Librería de Plantillas</h4>
                <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {templates.map((template) => (
                        <Card
                            key={template.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                                }`}
                            onClick={() => loadTemplate(template)}
                        >
                            <CardHeader className="p-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-sm font-medium truncate">
                                            {template.name}
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {template.createdAt.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 ml-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                duplicateTemplate(template);
                                            }}
                                            className="h-6 w-6 p-0"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                        {templates.length > 1 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteTemplate(template.id);
                                                }}
                                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                                <div
                                    className="aspect-video bg-cover bg-center rounded border"
                                    style={{
                                        backgroundImage: `url(${template.thumbnail})`,
                                        backgroundSize: 'cover'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
