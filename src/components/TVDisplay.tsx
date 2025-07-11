
import React, { useState, useEffect } from 'react';
import { TemplateData } from './AndroidTVSimulator';
import { WebTemplate } from '@/templates/webTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, RotateCcw, Search, Home, X } from 'lucide-react';

interface TVDisplayProps {
    templateData: TemplateData;
    webTemplate?: WebTemplate | null;
    selectedPage?: string;
    selectedHTMLFile?: any;
}

export const TVDisplay: React.FC<TVDisplayProps> = ({
    templateData,
    webTemplate,
    selectedPage,
    selectedHTMLFile
}) => {
    const [currentTime, setCurrentTime] = useState('');
    const [weather, setWeather] = useState({ temp: '18.28°C', icon: '🌤️' });
    const [browserUrl, setBrowserUrl] = useState('');
    const [showBrowser, setShowBrowser] = useState(false);
    const [browserHistory, setBrowserHistory] = useState<string[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const is24h = templateData.time?.format === '24h';
            const timeString = is24h
                ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                : now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            setCurrentTime(timeString);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [templateData.time?.format]);

    // Update weather from template data
    useEffect(() => {
        if (templateData.weather.enabled) {
            setWeather({
                temp: templateData.weather.temperature || '18.28°C',
                icon: templateData.weather.icon || '🌤️'
            });
        }
    }, [templateData.weather]);

    // Show browser when HTML file or web template is selected
    useEffect(() => {
        console.log('TVDisplay useEffect - selectedHTMLFile:', selectedHTMLFile);
        console.log('TVDisplay useEffect - webTemplate:', webTemplate);
        console.log('TVDisplay useEffect - selectedPage:', selectedPage);

        if (selectedHTMLFile || webTemplate) {
            setShowBrowser(true);
            const url = selectedHTMLFile
                ? `file://${selectedHTMLFile.name}`
                : `template://${webTemplate?.name}/${selectedPage}`;
            setBrowserUrl(url);

            // Add to history
            setBrowserHistory(prev => {
                const newHistory = [...prev, url];
                setCurrentHistoryIndex(newHistory.length - 1);
                return newHistory;
            });
        }
    }, [selectedHTMLFile, webTemplate, selectedPage]);

    const getCardStyle = (card: any) => {
        const size = card.size || 100;
        const position = card.position || 'center';

        let justifyClass = 'justify-center';
        if (position === 'left') justifyClass = 'justify-start';
        if (position === 'right') justifyClass = 'justify-end';

        return {
            transform: `scale(${size / 100})`,
            justifyContent: position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center'
        };
    };

    const handleAppClick = (app: any) => {
        if (app.url) {
            console.log(`Opening app: ${app.name || 'App'} - ${app.url}`);
        }
    };

    const handleCloseBrowser = () => {
        setShowBrowser(false);
        setBrowserUrl('');
    };

    const renderBrowserContent = () => {
        console.log('renderBrowserContent - selectedHTMLFile:', selectedHTMLFile);
        console.log('renderBrowserContent - webTemplate:', webTemplate);

        if (selectedHTMLFile) {
            return (
                <iframe
                    id="browser-iframe"
                    srcDoc={selectedHTMLFile.content}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    }}
                    title={`${selectedHTMLFile.name} Preview`}
                    sandbox="allow-scripts allow-same-origin"
                />
            );
        }

        if (webTemplate && selectedPage) {
            const pageToShow = selectedPage || webTemplate.mainFile;
            const mainFile = webTemplate.files.find(f => f.name === pageToShow);

            if (mainFile) {
                const cssFiles = webTemplate.files.filter(f => f.type === 'css');
                const jsFiles = webTemplate.files.filter(f => f.type === 'js');

                const fullHtmlContent = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${webTemplate.name} - ${pageToShow}</title>
            ${cssFiles.map(cssFile => `<style>${cssFile.content}</style>`).join('\n')}
          </head>
          <body>
            ${mainFile.content.replace(/<html[^>]*>|<\/html>|<head[^>]*>.*?<\/head>|<!DOCTYPE[^>]*>/gi, '')}
            ${jsFiles.map(jsFile => `<script>${jsFile.content}</script>`).join('\n')}
          </body>
          </html>
        `;

                return (
                    <iframe
                        id="browser-iframe"
                        srcDoc={fullHtmlContent}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none'
                        }}
                        title={`${webTemplate.name} - ${pageToShow} Preview`}
                        sandbox="allow-scripts allow-same-origin"
                    />
                );
            }
        }

        return null;
    };

    console.log('TVDisplay render - showBrowser:', showBrowser);

    // Main render - always show TV display with browser overlay when needed
    return (
        <div className="relative w-full max-w-none mx-auto">
            {/* Ultra-thin TV Bezel */}
            <div className="bg-gray-900 p-1 rounded-xl shadow-2xl border border-gray-800">
                <div className="bg-black rounded-lg overflow-hidden relative shadow-inner" style={{ width: '1200px', height: '675px' }}>

                    {/* Android TV Interface - Always visible as background */}
                    <>
                        {/* Full Background Coverage */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${templateData.backgroundImage})` }}
                        />

                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-40" />

                        {/* Content overlay */}
                        <div className="absolute inset-0 text-white flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-start px-12 py-8">
                                <div className="flex items-center">
                                    <div className="bg-white rounded-lg p-2 mr-4">
                                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">H</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold">Hilton</div>
                                        <div className="text-sm text-gray-300">SAN SALVADOR</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    {templateData.time?.enabled !== false && (
                                        <div className="text-4xl font-bold">{currentTime}</div>
                                    )}
                                    {templateData.weather.enabled && (
                                        <div className="flex items-center justify-end gap-2 mt-2">
                                            <span className="text-2xl">{weather.icon}</span>
                                            <span className="text-xl font-medium">{weather.temp}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 flex flex-col justify-center px-16 pb-16">
                                {/* Main Cards Row */}
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    {/* Hilton Honors Card */}
                                    <div
                                        className="relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl bg-gradient-to-r from-blue-800 to-blue-900"
                                        style={getCardStyle(templateData.cards.welcome)}
                                    >
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="text-2xl font-bold mb-2">{templateData.cards.welcome.title}</div>
                                                {templateData.cards.welcome.subtitle && (
                                                    <div className="text-sm text-gray-200 mb-4">
                                                        {templateData.cards.welcome.subtitle}
                                                    </div>
                                                )}
                                            </div>
                                            {templateData.cards.welcome.buttonText && (
                                                <div>
                                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                                                        {templateData.cards.welcome.buttonText}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Flight Status Card */}
                                    <div
                                        className="relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl"
                                        style={{
                                            backgroundImage: `url(${templateData.cards.flights.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            ...getCardStyle(templateData.cards.flights)
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                                            <div className="p-6 text-xl font-bold">{templateData.cards.flights.title}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Cards Row */}
                                <div className="grid grid-cols-3 gap-6 mb-12">
                                    {['hotel', 'menu', 'discover'].map((cardKey) => {
                                        const card = templateData.cards[cardKey as keyof typeof templateData.cards];
                                        return (
                                            <div
                                                key={cardKey}
                                                className="relative h-32 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl"
                                                style={{
                                                    backgroundImage: `url(${card.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    ...getCardStyle(card)
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                                                    <div className="p-4 text-lg font-semibold">{card.title}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Apps Row */}
                                <div className="flex justify-center">
                                    <div className="grid grid-cols-6 gap-4">
                                        {Object.entries(templateData.apps).map(([key, app]) => (
                                            <div
                                                key={key}
                                                className="bg-white rounded-2xl p-4 cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-xl w-20 h-20 flex items-center justify-center"
                                                onClick={() => handleAppClick(app)}
                                                title={app.url ? `Abrir ${app.name || key}: ${app.url}` : app.name || key}
                                            >
                                                {app.image ? (
                                                    <img
                                                        src={app.image}
                                                        alt={app.name || key}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <div className="text-xs font-bold text-gray-800 truncate">
                                                            {app.name || key}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                    {/* Browser Overlay - Only show when HTML file or web template is selected */}
                    {showBrowser && (
                        <div className="absolute inset-0 bg-black bg-opacity-80 z-50">
                            <div className="w-full h-full flex flex-col">
                                {/* Browser Controls */}
                                <div className="bg-gray-100 p-2 border-b border-gray-300 flex items-center gap-2 shrink-0">
                                    <div className="flex items-center gap-1">
                                        <div className="flex gap-1">
                                            <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={handleCloseBrowser}></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-1 ml-4">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                if (currentHistoryIndex > 0) {
                                                    const newIndex = currentHistoryIndex - 1;
                                                    setCurrentHistoryIndex(newIndex);
                                                    setBrowserUrl(browserHistory[newIndex]);
                                                }
                                            }}
                                            disabled={currentHistoryIndex <= 0}
                                            className="h-6 w-6 p-0"
                                        >
                                            <ArrowLeft className="h-3 w-3" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                if (currentHistoryIndex < browserHistory.length - 1) {
                                                    const newIndex = currentHistoryIndex + 1;
                                                    setCurrentHistoryIndex(newIndex);
                                                    setBrowserUrl(browserHistory[newIndex]);
                                                }
                                            }}
                                            disabled={currentHistoryIndex >= browserHistory.length - 1}
                                            className="h-6 w-6 p-0"
                                        >
                                            <ArrowRight className="h-3 w-3" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                const iframe = document.querySelector('#browser-iframe') as HTMLIFrameElement;
                                                if (iframe) {
                                                    iframe.src = iframe.src;
                                                }
                                            }}
                                            className="h-6 w-6 p-0"
                                        >
                                            <RotateCcw className="h-3 w-3" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleCloseBrowser}
                                            className="h-6 w-6 p-0"
                                        >
                                            <Home className="h-3 w-3" />
                                        </Button>

                                        {/* URL Bar */}
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                            <Input
                                                value={browserUrl}
                                                onChange={(e) => setBrowserUrl(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const newUrl = (e.target as HTMLInputElement).value;
                                                        setBrowserUrl(newUrl);
                                                        setBrowserHistory(prev => {
                                                            const newHistory = [...prev, newUrl];
                                                            setCurrentHistoryIndex(newHistory.length - 1);
                                                            return newHistory;
                                                        });
                                                    }
                                                }}
                                                placeholder="Buscar o introducir dirección web"
                                                className="pl-8 h-6 text-xs bg-white rounded-full border-gray-300"
                                            />
                                        </div>

                                        {/* Close Button */}
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleCloseBrowser}
                                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Browser Content */}
                                <div className="flex-1 bg-white overflow-hidden">
                                    {renderBrowserContent()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* TV Stand */}
            <div className="flex justify-center mt-1">
                <div className="w-24 h-0.5 bg-gray-800 rounded-full"></div>
            </div>

            {/* Info overlay - only show when browser is active */}
            {showBrowser && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm z-50">
                    📄 {selectedHTMLFile
                        ? selectedHTMLFile.name
                        : webTemplate
                            ? `${webTemplate.name} - ${selectedPage}`
                            : 'Browser'
                    }
                </div>
            )}
        </div>
    );
};
