import React, { useState } from 'react';
import { WebTemplate, webTemplates } from '../templates/webTemplates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    FileText, Folder, Download, Eye, Code,
    Globe, Zap
} from 'lucide-react';

interface WebTemplateManagerProps {
    onLoadWebTemplate: (template: WebTemplate, selectedPage?: string) => void;
}

export const WebTemplateManager: React.FC<WebTemplateManagerProps> = ({
    onLoadWebTemplate
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<WebTemplate | null>(null);
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [viewingFile, setViewingFile] = useState<string | null>(null);

    const loadTemplate = (template: WebTemplate, page?: string) => {
        const pageToLoad = page || template.mainFile;
        onLoadWebTemplate(template, pageToLoad);
        setSelectedTemplate(template);
        setSelectedPage(pageToLoad);
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'html': return <Globe className="h-4 w-4 text-orange-500" />;
            case 'css': return <Code className="h-4 w-4 text-blue-500" />;
            case 'js': return <Zap className="h-4 w-4 text-yellow-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    const downloadTemplate = (template: WebTemplate) => {
        // Crear un objeto con todos los archivos
        const templateData = {
            name: template.name,
            description: template.description,
            files: template.files.reduce((acc, file) => {
                acc[file.path] = file.content;
                return acc;
            }, {} as Record<string, string>)
        };

        const dataStr = JSON.stringify(templateData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `${template.id}-template.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Obtener páginas HTML de la plantilla seleccionada
    const getHtmlPages = (template: WebTemplate) => {
        return template.files.filter(file => file.type === 'html');
    };

    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Plantillas Web Completas</h3>
                <p className="text-sm text-muted-foreground">
                    Sitios web completos con múltiples páginas y archivos
                </p>
            </div>

            {/* Selector de página si hay una plantilla seleccionada */}
            {selectedTemplate && (
                <Card className="mb-4">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">
                            Seleccionar Página - {selectedTemplate.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <Select
                            value={selectedPage}
                            onValueChange={(value) => {
                                setSelectedPage(value);
                                loadTemplate(selectedTemplate, value);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona una página" />
                            </SelectTrigger>
                            <SelectContent>
                                {getHtmlPages(selectedTemplate).map((file) => (
                                    <SelectItem key={file.name} value={file.name}>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-orange-500" />
                                            {file.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            )}

            {/* Lista de plantillas */}
            <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
                {webTemplates.map((template) => (
                    <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                            }`}
                    >
                        <CardHeader className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-sm font-medium truncate">
                                        {template.name}
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {template.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {template.files.length} archivos | {getHtmlPages(template).length} páginas HTML
                                    </p>
                                </div>
                                <div className="flex gap-1 ml-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            downloadTemplate(template);
                                        }}
                                        className="h-6 w-6 p-0"
                                        title="Descargar plantilla"
                                    >
                                        <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            loadTemplate(template);
                                        }}
                                        className="h-6 w-6 p-0"
                                        title="Cargar en TV"
                                    >
                                        <Eye className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div
                                className="aspect-video bg-cover bg-center rounded border mb-3"
                                style={{
                                    backgroundImage: `url(${template.thumbnail})`,
                                    backgroundSize: 'cover'
                                }}
                            />

                            {/* Lista de archivos */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Folder className="h-3 w-3" />
                                    Estructura de archivos:
                                </div>
                                <div className="max-h-24 overflow-y-auto space-y-1">
                                    {template.files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-xs p-1 hover:bg-muted/50 rounded cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setViewingFile(viewingFile === file.name ? null : file.name);
                                            }}
                                        >
                                            {getFileIcon(file.type)}
                                            <span className="flex-1 truncate">{file.path}</span>
                                            <span className="text-muted-foreground uppercase text-[10px]">
                                                {file.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Visor de código */}
            {viewingFile && selectedTemplate && (
                <Card className="mt-4">
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            {viewingFile}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewingFile(null)}
                                className="ml-auto h-6 w-6 p-0"
                            >
                                ×
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
                            <code>
                                {selectedTemplate.files.find(f => f.name === viewingFile)?.content}
                            </code>
                        </pre>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
