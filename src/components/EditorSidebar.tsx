import React, { useState } from 'react';
import { TemplateData } from './AndroidTVSimulator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    Save, Upload, Download, RotateCcw, Settings, Image, Type, Wifi,
    ChevronDown, ChevronRight, Palette, Monitor, Globe, Link, MapPin,
    Clock, Thermometer, Star
} from 'lucide-react';
import { WebTemplate } from '@/templates/webTemplates';

interface EditorSidebarProps {
    templateData: TemplateData;
    onUpdate: (newData: Partial<TemplateData>) => void;
    onSave?: () => void;
    onLoad?: () => void;
    onExport?: () => void;
    onReset?: () => void;
    webTemplate?: WebTemplate | null;
    selectedPage?: string;
}

const countries = [
    { code: 'SV', name: 'El Salvador', city: 'San Salvador' },
    { code: 'US', name: 'Estados Unidos', city: 'New York' },
    { code: 'MX', name: 'México', city: 'Ciudad de México' },
    { code: 'GT', name: 'Guatemala', city: 'Guatemala City' },
    { code: 'CR', name: 'Costa Rica', city: 'San José' },
    { code: 'ES', name: 'España', city: 'Madrid' },
    { code: 'AR', name: 'Argentina', city: 'Buenos Aires' },
];

const weatherIcons = ['🌤️', '☀️', '⛅', '🌧️', '⛈️', '🌨️', '🌪️', '🌈'];

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
    templateData,
    onUpdate,
    onSave,
    onLoad,
    onExport,
    onReset,
    webTemplate,
    selectedPage
}) => {
    const [openSections, setOpenSections] = useState({
        general: true,
        cards: true,
        apps: true,
        settings: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const updateCardProperty = (cardKey: keyof TemplateData['cards'], property: string, value: any) => {
        onUpdate({
            cards: {
                ...templateData.cards,
                [cardKey]: { ...templateData.cards[cardKey], [property]: value }
            }
        });
    };

    const updateAppProperty = (appKey: keyof TemplateData['apps'], property: string, value: any) => {
        onUpdate({
            apps: {
                ...templateData.apps,
                [appKey]: { ...templateData.apps[appKey], [property]: value }
            }
        });
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Editor de Plantilla</h2>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onSave}
                        className="flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        Guardar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onLoad}
                        className="flex items-center gap-2"
                    >
                        <Upload className="h-4 w-4" />
                        Cargar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onExport}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Exportar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onReset}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Restablecer
                    </Button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {/* General Section */}
                <Collapsible open={openSections.general} onOpenChange={() => toggleSection('general')}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            <span className="font-medium">General</span>
                        </div>
                        {openSections.general ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-4">
                        <div className="space-y-3 pl-2">
                            {/* Current Template Info */}
                            {webTemplate && (
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-800">Plantilla Web Activa</span>
                                    </div>
                                    <div className="text-xs text-blue-700">
                                        <div className="font-medium">{webTemplate.name}</div>
                                        <div className="text-blue-600">Página: {selectedPage || webTemplate.mainFile}</div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="logo" className="flex items-center gap-2 text-sm">
                                    <Image className="h-4 w-4" />
                                    Logo del Hotel
                                </Label>
                                <Input
                                    id="logo"
                                    value={templateData.logo}
                                    onChange={(e) => onUpdate({ logo: e.target.value })}
                                    placeholder="URL del logo"
                                    className="h-8"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="background" className="flex items-center gap-2 text-sm">
                                    <Monitor className="h-4 w-4" />
                                    Imagen de Fondo
                                </Label>
                                <Input
                                    id="background"
                                    value={templateData.backgroundImage}
                                    onChange={(e) => onUpdate({ backgroundImage: e.target.value })}
                                    placeholder="URL de la imagen de fondo"
                                    className="h-8"
                                />
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Cards Section */}
                <Collapsible open={openSections.cards} onOpenChange={() => toggleSection('cards')}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2">
                            <Type className="h-4 w-4" />
                            <span className="font-medium">Tarjetas</span>
                        </div>
                        {openSections.cards ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-4">
                        <div className="space-y-4 pl-2">
                            {Object.entries(templateData.cards).map(([key, card]) => (
                                <div key={key} className="space-y-3 p-3 border rounded-lg bg-background">
                                    <h4 className="font-medium text-sm flex items-center gap-2">
                                        <Star className="w-3 h-3 text-primary" />
                                        {key === 'welcome' && 'Bienvenida'}
                                        {key === 'flights' && 'Vuelos'}
                                        {key === 'hotel' && 'Hotel'}
                                        {key === 'menu' && 'Menu'}
                                        {key === 'discover' && 'Descubrir'}
                                    </h4>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Título</Label>
                                            <Input
                                                value={card.title}
                                                onChange={(e) => updateCardProperty(key as keyof TemplateData['cards'], 'title', e.target.value)}
                                                placeholder="Título de la tarjeta"
                                                className="h-8 text-xs"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Subtítulo/Comentario</Label>
                                            <Textarea
                                                value={card.subtitle || ''}
                                                onChange={(e) => updateCardProperty(key as keyof TemplateData['cards'], 'subtitle', e.target.value)}
                                                placeholder="Descripción o comentario"
                                                className="text-xs min-h-[60px]"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Texto del Botón</Label>
                                            <Input
                                                value={card.buttonText || ''}
                                                onChange={(e) => updateCardProperty(key as keyof TemplateData['cards'], 'buttonText', e.target.value)}
                                                placeholder="Texto del botón"
                                                className="h-8 text-xs"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Imagen</Label>
                                            <Input
                                                value={card.image}
                                                onChange={(e) => updateCardProperty(key as keyof TemplateData['cards'], 'image', e.target.value)}
                                                placeholder="URL de la imagen"
                                                className="h-8 text-xs"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <Label className="text-xs">Tamaño (%)</Label>
                                                <div className="px-2">
                                                    <Slider
                                                        value={[card.size || 100]}
                                                        onValueChange={(value) => updateCardProperty(key as keyof TemplateData['cards'], 'size', value[0])}
                                                        min={50}
                                                        max={150}
                                                        step={5}
                                                        className="w-full"
                                                    />
                                                    <div className="text-xs text-center text-muted-foreground mt-1">
                                                        {card.size || 100}%
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <Label className="text-xs">Posición</Label>
                                                <Select
                                                    value={card.position || 'center'}
                                                    onValueChange={(value) => updateCardProperty(key as keyof TemplateData['cards'], 'position', value)}
                                                >
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="left">Izquierda</SelectItem>
                                                        <SelectItem value="center">Centro</SelectItem>
                                                        <SelectItem value="right">Derecha</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Apps Section */}
                <Collapsible open={openSections.apps} onOpenChange={() => toggleSection('apps')}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            <span className="font-medium">Apps</span>
                        </div>
                        {openSections.apps ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-3">
                        <div className="space-y-3 pl-2">
                            {Object.entries(templateData.apps).map(([key, app]) => (
                                <div key={key} className="space-y-2 p-3 border rounded-lg bg-background">
                                    <h4 className="font-medium text-sm flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        {key === 'streamtv' && 'Stream TV'}
                                        {key === 'netflix' && 'Netflix'}
                                        {key === 'primevideo' && 'Prime Video'}
                                        {key === 'disney' && 'Disney+'}
                                        {key === 'youtube' && 'YouTube'}
                                        {key === 'wifi' && 'WiFi'}
                                    </h4>

                                    <div className="space-y-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Nombre</Label>
                                            <Input
                                                value={app.name || key}
                                                onChange={(e) => updateAppProperty(key as keyof TemplateData['apps'], 'name', e.target.value)}
                                                placeholder="Nombre de la app"
                                                className="h-8 text-xs"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Icono/Imagen</Label>
                                            <Input
                                                value={app.image}
                                                onChange={(e) => updateAppProperty(key as keyof TemplateData['apps'], 'image', e.target.value)}
                                                placeholder="URL del icono"
                                                className="h-8 text-xs"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs flex items-center gap-1">
                                                <Link className="h-3 w-3" />
                                                Hipervínculo
                                            </Label>
                                            <Input
                                                value={app.url || ''}
                                                onChange={(e) => updateAppProperty(key as keyof TemplateData['apps'], 'url', e.target.value)}
                                                placeholder="https://..."
                                                className="h-8 text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Settings Section */}
                <Collapsible open={openSections.settings} onOpenChange={() => toggleSection('settings')}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            <span className="font-medium">Configuración</span>
                        </div>
                        {openSections.settings ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-4">
                        <div className="space-y-4 pl-2">
                            {/* Time Configuration */}
                            <div className="space-y-3 p-3 border rounded-lg bg-background">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Configuración de Hora
                                </h4>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="time-enabled"
                                            checked={templateData.time?.enabled !== false}
                                            onCheckedChange={(enabled) =>
                                                onUpdate({ time: { ...templateData.time, enabled } })
                                            }
                                        />
                                        <Label htmlFor="time-enabled" className="text-xs">Mostrar Hora</Label>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-xs">Formato</Label>
                                        <Select
                                            value={templateData.time?.format || '24h'}
                                            onValueChange={(format: '12h' | '24h') =>
                                                onUpdate({ time: { ...templateData.time, format } })
                                            }
                                        >
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                                                <SelectItem value="24h">24 horas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Weather Configuration */}
                            <div className="space-y-3 p-3 border rounded-lg bg-background">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                    <Thermometer className="h-4 w-4" />
                                    Información del Clima
                                </h4>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="weather-enabled"
                                            checked={templateData.weather.enabled}
                                            onCheckedChange={(enabled) =>
                                                onUpdate({ weather: { ...templateData.weather, enabled } })
                                            }
                                        />
                                        <Label htmlFor="weather-enabled" className="text-xs">Mostrar Clima</Label>
                                    </div>

                                    {templateData.weather.enabled && (
                                        <>
                                            <div className="space-y-1">
                                                <Label className="text-xs flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    País/Ciudad
                                                </Label>
                                                <Select
                                                    value={templateData.weather.country || 'SV'}
                                                    onValueChange={(country) => {
                                                        const selectedCountry = countries.find(c => c.code === country);
                                                        onUpdate({
                                                            weather: {
                                                                ...templateData.weather,
                                                                country,
                                                                location: selectedCountry?.city || templateData.weather.location
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country.code} value={country.code}>
                                                                {country.name} - {country.city}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1">
                                                <Label className="text-xs">Ubicación Personalizada</Label>
                                                <Input
                                                    value={templateData.weather.location}
                                                    onChange={(e) =>
                                                        onUpdate({ weather: { ...templateData.weather, location: e.target.value } })
                                                    }
                                                    placeholder="Ciudad, País"
                                                    className="h-8 text-xs"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <Label className="text-xs">Icono del Clima</Label>
                                                <div className="grid grid-cols-4 gap-1">
                                                    {weatherIcons.map((icon) => (
                                                        <Button
                                                            key={icon}
                                                            variant={templateData.weather.icon === icon ? "default" : "outline"}
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-lg"
                                                            onClick={() =>
                                                                onUpdate({ weather: { ...templateData.weather, icon } })
                                                            }
                                                        >
                                                            {icon}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <Label className="text-xs">Temperatura</Label>
                                                <Input
                                                    value={templateData.weather.temperature || '18.28°C'}
                                                    onChange={(e) =>
                                                        onUpdate({ weather: { ...templateData.weather, temperature: e.target.value } })
                                                    }
                                                    placeholder="18.28°C"
                                                    className="h-8 text-xs"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};
