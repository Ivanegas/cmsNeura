
import React from 'react';
import { TemplateData } from './AndroidTVSimulator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save, Upload, Download, RotateCcw, Eye, EyeOff, Palette, Settings, Image, Type, Wifi } from 'lucide-react';

interface EditorMenuProps {
    templateData: TemplateData;
    onUpdate: (newData: Partial<TemplateData>) => void;
    onSave?: () => void;
    onLoad?: () => void;
    onExport?: () => void;
    onReset?: () => void;
}

export const EditorMenu: React.FC<EditorMenuProps> = ({
    templateData,
    onUpdate,
    onSave,
    onLoad,
    onExport,
    onReset
}) => {
    const updateCardTitle = (cardKey: keyof TemplateData['cards'], title: string) => {
        onUpdate({
            cards: {
                ...templateData.cards,
                [cardKey]: { ...templateData.cards[cardKey], title }
            }
        });
    };

    const updateCardImage = (cardKey: keyof TemplateData['cards'], image: string) => {
        onUpdate({
            cards: {
                ...templateData.cards,
                [cardKey]: { ...templateData.cards[cardKey], image }
            }
        });
    };

    const updateAppImage = (appKey: keyof TemplateData['apps'], image: string) => {
        onUpdate({
            apps: {
                ...templateData.apps,
                [appKey]: { image }
            }
        });
    };

    return (
        <Card className="h-fit">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Editor de Plantilla
                    </CardTitle>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
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
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="general" className="flex items-center gap-1">
                            <Palette className="h-4 w-4" />
                            General
                        </TabsTrigger>
                        <TabsTrigger value="cards" className="flex items-center gap-1">
                            <Type className="h-4 w-4" />
                            Tarjetas
                        </TabsTrigger>
                        <TabsTrigger value="apps" className="flex items-center gap-1">
                            <Image className="h-4 w-4" />
                            Apps
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-1">
                            <Wifi className="h-4 w-4" />
                            Config
                        </TabsTrigger>
                    </TabsList>

                    {/* General Tab */}
                    <TabsContent value="general" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Configuración General</h3>

                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label htmlFor="logo" className="flex items-center gap-2">
                                        <Image className="h-4 w-4" />
                                        Logo del Hotel
                                    </Label>
                                    <Input
                                        id="logo"
                                        value={templateData.logo}
                                        onChange={(e) => onUpdate({ logo: e.target.value })}
                                        placeholder="URL del logo"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="background" className="flex items-center gap-2">
                                        <Image className="h-4 w-4" />
                                        Imagen de Fondo
                                    </Label>
                                    <Input
                                        id="background"
                                        value={templateData.backgroundImage}
                                        onChange={(e) => onUpdate({ backgroundImage: e.target.value })}
                                        placeholder="URL de la imagen de fondo"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Cards Tab */}
                    <TabsContent value="cards" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Tarjetas Principales</h3>

                            {Object.entries(templateData.cards).map(([key, card]) => (
                                <div key={key} className="space-y-3 p-4 border rounded-lg bg-muted/50">
                                    <h4 className="font-medium capitalize flex items-center gap-2">
                                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                                        {key === 'welcome' && 'Bienvenida'}
                                        {key === 'flights' && 'Vuelos'}
                                        {key === 'hotel' && 'Hotel'}
                                        {key === 'menu' && 'Menu'}
                                        {key === 'discover' && 'Descubrir'}
                                    </h4>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="space-y-2">
                                            <Label>Título</Label>
                                            <Input
                                                value={card.title}
                                                onChange={(e) => updateCardTitle(key as keyof TemplateData['cards'], e.target.value)}
                                                placeholder="Título de la tarjeta"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Imagen</Label>
                                            <Input
                                                value={card.image}
                                                onChange={(e) => updateCardImage(key as keyof TemplateData['cards'], e.target.value)}
                                                placeholder="URL de la imagen"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Apps Tab */}
                    <TabsContent value="apps" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Aplicaciones de Entretenimiento</h3>

                            <div className="grid grid-cols-1 gap-4">
                                {Object.entries(templateData.apps).map(([key, app]) => (
                                    <div key={key} className="space-y-2 p-3 border rounded-lg bg-muted/50">
                                        <h4 className="font-medium capitalize flex items-center gap-2">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            {key === 'streamtv' && 'Stream TV'}
                                            {key === 'netflix' && 'Netflix'}
                                            {key === 'primevideo' && 'Prime Video'}
                                            {key === 'disney' && 'Disney+'}
                                            {key === 'youtube' && 'YouTube'}
                                            {key === 'wifi' && 'WiFi'}
                                        </h4>

                                        <div className="space-y-2">
                                            <Label>Icono</Label>
                                            <Input
                                                value={app.image}
                                                onChange={(e) => updateAppImage(key as keyof TemplateData['apps'], e.target.value)}
                                                placeholder="URL del icono"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Configuración del Sistema</h3>

                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <h4 className="font-medium">Información del Clima</h4>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="weather-enabled"
                                            checked={templateData.weather.enabled}
                                            onCheckedChange={(enabled) =>
                                                onUpdate({ weather: { ...templateData.weather, enabled } })
                                            }
                                        />
                                        <Label htmlFor="weather-enabled">Mostrar Clima</Label>
                                    </div>

                                    {templateData.weather.enabled && (
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Ubicación</Label>
                                            <Input
                                                id="location"
                                                value={templateData.weather.location}
                                                onChange={(e) =>
                                                    onUpdate({ weather: { ...templateData.weather, location: e.target.value } })
                                                }
                                                placeholder="Ciudad, País"
                                            />
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <h4 className="font-medium">Vista Previa</h4>
                                    <div className="text-sm text-muted-foreground">
                                        La vista previa se actualiza automáticamente cuando realizas cambios.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
