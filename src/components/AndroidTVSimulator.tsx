import React, { useState, useEffect } from 'react';
import { EditorSidebar } from './EditorSidebar';
import { TVDisplay } from './TVDisplay';
import { TemplateLibrary } from './TemplateLibrary';
import { WebTemplateManager } from './WebTemplateManager';
import { HTMLFileBrowser } from './HTMLFileBrowser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebTemplate } from '../templates/webTemplates';

export interface TemplateData {
    logo: string;
    backgroundImage: string;
    cards: {
        welcome: {
            image: string;
            title: string;
            subtitle?: string;
            buttonText?: string;
            size?: number;
            position?: 'left' | 'center' | 'right';
        };
        flights: {
            image: string;
            title: string;
            subtitle?: string;
            buttonText?: string;
            size?: number;
            position?: 'left' | 'center' | 'right';
        };
        hotel: {
            image: string;
            title: string;
            subtitle?: string;
            buttonText?: string;
            size?: number;
            position?: 'left' | 'center' | 'right';
        };
        menu: {
            image: string;
            title: string;
            subtitle?: string;
            buttonText?: string;
            size?: number;
            position?: 'left' | 'center' | 'right';
        };
        discover: {
            image: string;
            title: string;
            subtitle?: string;
            buttonText?: string;
            size?: number;
            position?: 'left' | 'center' | 'right';
        };
    };
    apps: {
        streamtv: { image: string; name?: string; url?: string };
        netflix: { image: string; name?: string; url?: string };
        primevideo: { image: string; name?: string; url?: string };
        disney: { image: string; name?: string; url?: string };
        youtube: { image: string; name?: string; url?: string };
        wifi: { image: string; name?: string; url?: string };
    };
    weather: {
        enabled: boolean;
        location: string;
        country?: string;
        icon?: string;
        temperature?: string;
    };
    time?: {
        enabled: boolean;
        format: '12h' | '24h';
    };
}

const defaultTemplate: TemplateData = {
    logo: 'https://logos-world.net/wp-content/uploads/2020/06/Hilton-Logo.png',
    backgroundImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop',
    cards: {
        welcome: {
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=300&fit=crop',
            title: 'Hilton Honors',
            subtitle: 'Únete a Hilton Honors y descubre todos los beneficios exclusivos que tenemos para ti!',
            buttonText: 'Más información',
            size: 100,
            position: 'center'
        },
        flights: {
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=300&fit=crop',
            title: 'Flight status',
            size: 100,
            position: 'center'
        },
        hotel: {
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop',
            title: 'Enjoy your Hotel',
            size: 100,
            position: 'center'
        },
        menu: {
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
            title: 'Menu and services',
            size: 100,
            position: 'center'
        },
        discover: {
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            title: 'Discover El Salvador',
            size: 100,
            position: 'center'
        },
    },
    apps: {
        streamtv: { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', name: 'Stream TV', url: '' },
        netflix: { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', name: 'Netflix', url: 'https://netflix.com' },
        primevideo: { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', name: 'Prime Video', url: 'https://primevideo.com' },
        disney: { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', name: 'Disney+', url: 'https://disneyplus.com' },
        youtube: { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', name: 'YouTube', url: 'https://youtube.com' },
        wifi: { image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', name: 'Wi-Fi', url: '' },
    },
    weather: {
        enabled: true,
        location: 'San Salvador, El Salvador',
        country: 'SV',
        icon: '🌤️',
        temperature: '18.28°C'
    },
    time: {
        enabled: true,
        format: '24h'
    }
};

export const AndroidTVSimulator = () => {
    const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplate);
    const [webTemplate, setWebTemplate] = useState<WebTemplate | null>(null);
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [selectedHTMLFile, setSelectedHTMLFile] = useState<any>(null);

    const updateTemplate = (newData: Partial<TemplateData>) => {
        setTemplateData(prev => ({ ...prev, ...newData }));
        // Limpiar plantilla web cuando se edita el template normal
        setWebTemplate(null);
        setSelectedPage('');
        setSelectedHTMLFile(null);
    };

    const loadTemplate = (newTemplate: TemplateData) => {
        setTemplateData(newTemplate);
        setWebTemplate(null);
        setSelectedPage('');
        setSelectedHTMLFile(null);
    };

    const loadWebTemplate = (template: WebTemplate, page?: string) => {
        setWebTemplate(template);
        setSelectedPage(page || template.mainFile);
        setSelectedHTMLFile(null);
        console.log('Plantilla web cargada:', template.name, 'Página:', page || template.mainFile);
    };

    const loadHTMLFile = (file: any) => {
        setSelectedHTMLFile(file);
        setWebTemplate(null);
        setSelectedPage('');
        console.log('Archivo HTML cargado:', file.name);
    };

    const handleSave = () => {
        if (selectedHTMLFile) {
            localStorage.setItem('currentHTMLFile', JSON.stringify(selectedHTMLFile));
            console.log('Archivo HTML guardado!');
        } else if (webTemplate) {
            const saveData = { webTemplate, selectedPage };
            localStorage.setItem('currentWebTemplate', JSON.stringify(saveData));
            console.log('Plantilla web guardada!');
        } else {
            localStorage.setItem('androidTVTemplate', JSON.stringify(templateData));
            console.log('Template guardado!');
        }
    };

    const handleLoad = () => {
        // Intentar cargar archivo HTML primero
        const savedHTMLFile = localStorage.getItem('currentHTMLFile');
        if (savedHTMLFile) {
            const file = JSON.parse(savedHTMLFile);
            setSelectedHTMLFile(file);
            console.log('Archivo HTML cargado!');
            return;
        }

        // Intentar cargar plantilla web
        const savedWebTemplate = localStorage.getItem('currentWebTemplate');
        if (savedWebTemplate) {
            const savedData = JSON.parse(savedWebTemplate);
            setWebTemplate(savedData.webTemplate);
            setSelectedPage(savedData.selectedPage || savedData.webTemplate.mainFile);
            console.log('Plantilla web cargada!');
            return;
        }

        // Si no hay plantilla web, cargar template normal
        const saved = localStorage.getItem('androidTVTemplate');
        if (saved) {
            setTemplateData(JSON.parse(saved));
            console.log('Template cargado!');
        }
    };

    const handleExport = () => {
        const dataToExport = selectedHTMLFile
            ? selectedHTMLFile
            : webTemplate
                ? { webTemplate, selectedPage }
                : templateData;
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = selectedHTMLFile
            ? `${selectedHTMLFile.name.replace('.html', '')}-export.json`
            : webTemplate
                ? `${webTemplate.id}-web-template.json`
                : 'android-tv-template.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleReset = () => {
        setTemplateData(defaultTemplate);
        setWebTemplate(null);
        setSelectedPage('');
        setSelectedHTMLFile(null);
        console.log('Todo reseteado!');
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen">
                {/* Fixed Sidebar */}
                <div className="w-80 border-r border-border bg-card flex flex-col shrink-0">
                    <Tabs defaultValue="editor" className="flex-1 flex flex-col h-full">
                        <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
                            <TabsTrigger value="editor">Editor</TabsTrigger>
                            <TabsTrigger value="library">Librería</TabsTrigger>
                            <TabsTrigger value="web">Web</TabsTrigger>
                            <TabsTrigger value="html">HTML</TabsTrigger>
                        </TabsList>

                        <TabsContent value="editor" className="flex-1 overflow-hidden">
                            <EditorSidebar
                                templateData={templateData}
                                onUpdate={updateTemplate}
                                onSave={handleSave}
                                onLoad={handleLoad}
                                onExport={handleExport}
                                onReset={handleReset}
                                webTemplate={webTemplate}
                                selectedPage={selectedPage}
                            />
                        </TabsContent>

                        <TabsContent value="library" className="flex-1 overflow-hidden p-4">
                            <TemplateLibrary
                                currentTemplate={templateData}
                                onLoadTemplate={loadTemplate}
                            />
                        </TabsContent>

                        <TabsContent value="web" className="flex-1 overflow-hidden p-4">
                            <WebTemplateManager
                                onLoadWebTemplate={loadWebTemplate}
                            />
                        </TabsContent>

                        <TabsContent value="html" className="flex-1 overflow-hidden p-4">
                            <HTMLFileBrowser
                                onSelectFile={loadHTMLFile}
                                selectedFile={selectedHTMLFile}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Fixed Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="p-6 border-b border-border shrink-0">
                        <h1 className="text-3xl font-bold text-foreground">Android TV Template Editor</h1>
                        <p className="text-muted-foreground mt-2">
                            {selectedHTMLFile
                                ? `Mostrando archivo HTML: ${selectedHTMLFile.name}`
                                : webTemplate
                                    ? `Mostrando plantilla web: ${webTemplate.name} - ${selectedPage}`
                                    : 'Edita tu plantilla de Android TV en tiempo real'
                            }
                        </p>
                    </div>

                    {/* TV Display Area - Fixed at 80% zoom */}
                    <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                        <div
                            style={{
                                transform: 'scale(0.8)',
                                transformOrigin: 'center center'
                            }}
                            className="transition-transform duration-300"
                        >
                            <TVDisplay
                                templateData={templateData}
                                webTemplate={webTemplate}
                                selectedPage={selectedPage}
                                selectedHTMLFile={selectedHTMLFile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
