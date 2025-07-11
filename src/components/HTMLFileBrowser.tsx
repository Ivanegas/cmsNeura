
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    File, Folder, Search, Upload, Trash2,
    Eye, Code, Plus, FileText, Edit, Save, X
} from 'lucide-react';

interface HTMLFile {
    id: string;
    name: string;
    content: string;
    path: string;
    lastModified: Date;
}

interface HTMLFileBrowserProps {
    onSelectFile: (file: HTMLFile) => void;
    selectedFile?: HTMLFile | null;
}

export const HTMLFileBrowser: React.FC<HTMLFileBrowserProps> = ({
    onSelectFile,
    selectedFile
}) => {
    const [files, setFiles] = useState<HTMLFile[]>([
        {
            id: 'default-index',
            name: 'index.html',
            path: '/index.html',
            content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Android TV Interface</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 2rem; 
            background: rgba(0,0,0,0.3);
        }
        .logo { 
            display: flex; 
            align-items: center; 
            gap: 1rem; 
            font-size: 2rem; 
            font-weight: bold; 
        }
        .logo-icon { 
            width: 50px; 
            height: 50px; 
            background: #4f46e5; 
            border-radius: 8px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
        }
        .time-weather { 
            text-align: right; 
        }
        .time { 
            font-size: 2.5rem; 
            font-weight: bold; 
        }
        .weather { 
            display: flex; 
            align-items: center; 
            gap: 0.5rem; 
            justify-content: flex-end; 
            margin-top: 0.5rem; 
        }
        .main-content { 
            flex: 1; 
            padding: 2rem; 
            display: flex; 
            flex-direction: column; 
            gap: 2rem; 
        }
        .cards-grid { 
            display: grid; 
            grid-template-columns: 2fr 1fr; 
            gap: 2rem; 
        }
        .main-card { 
            background: rgba(255,255,255,0.1); 
            border-radius: 16px; 
            padding: 2rem; 
            backdrop-filter: blur(10px); 
            border: 1px solid rgba(255,255,255,0.2); 
        }
        .main-card h2 { 
            font-size: 2rem; 
            margin-bottom: 1rem; 
        }
        .main-card p { 
            opacity: 0.9; 
            margin-bottom: 1.5rem; 
        }
        .btn { 
            background: #4f46e5; 
            color: white; 
            padding: 0.75rem 1.5rem; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            font-weight: 500; 
        }
        .secondary-cards { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 1.5rem; 
        }
        .card { 
            background: rgba(255,255,255,0.1); 
            border-radius: 12px; 
            padding: 1.5rem; 
            text-align: center; 
            backdrop-filter: blur(10px); 
            border: 1px solid rgba(255,255,255,0.2); 
            cursor: pointer; 
            transition: transform 0.2s; 
        }
        .card:hover { 
            transform: translateY(-5px); 
        }
        .apps { 
            display: flex; 
            justify-content: center; 
            gap: 1.5rem; 
        }
        .app { 
            width: 80px; 
            height: 80px; 
            background: rgba(255,255,255,0.2); 
            border-radius: 16px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            cursor: pointer; 
            transition: transform 0.2s; 
        }
        .app:hover { 
            transform: scale(1.1); 
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">
            <div class="logo-icon">H</div>
            <div>
                <div>Hilton</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">SAN SALVADOR</div>
            </div>
        </div>
        <div class="time-weather">
            <div class="time" id="current-time">12:34</div>
            <div class="weather">
                <span>🌤️</span>
                <span>18°C</span>
            </div>
        </div>
    </header>

    <main class="main-content">
        <div class="cards-grid">
            <div class="main-card">
                <h2>Bienvenido a Hilton Honors</h2>
                <p>Únete a Hilton Honors y descubre todos los beneficios exclusivos que tenemos para ti!</p>
                <button class="btn">Más información</button>
            </div>
            <div class="main-card">
                <h2>Estado de Vuelos</h2>
                <p>Consulta el estado de tu vuelo en tiempo real</p>
                <button class="btn">Ver vuelos</button>
            </div>
        </div>

        <div class="secondary-cards">
            <div class="card">
                <h3>Disfruta tu Hotel</h3>
                <p>Servicios y comodidades</p>
            </div>
            <div class="card">
                <h3>Menú y Servicios</h3>
                <p>Room service y más</p>
            </div>
            <div class="card">
                <h3>Descubre El Salvador</h3>
                <p>Lugares y actividades</p>
            </div>
        </div>

        <div class="apps">
            <div class="app">📺</div>
            <div class="app">🎬</div>
            <div class="app">🎵</div>
            <div class="app">🎮</div>
            <div class="app">📱</div>
            <div class="app">📡</div>
        </div>
    </main>

    <script>
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            document.getElementById('current-time').textContent = timeString;
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    </script>
</body>
</html>`,
            lastModified: new Date()
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [editingFile, setEditingFile] = useState<HTMLFile | null>(null);
    const [editContent, setEditContent] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.path.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const createNewFile = () => {
        if (!newFileName.trim()) return;

        const fileName = newFileName.endsWith('.html') ? newFileName : `${newFileName}.html`;
        const newFile: HTMLFile = {
            id: Date.now().toString(),
            name: fileName,
            path: `/${fileName}`,
            content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f0f0f0; 
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Nueva Página: ${fileName}</h1>
        <p>Contenido de la nueva página HTML.</p>
    </div>
</body>
</html>`,
            lastModified: new Date()
        };

        setFiles(prev => [...prev, newFile]);
        setNewFileName('');
        setIsCreatingFile(false);
        console.log('Nuevo archivo creado:', fileName);
    };

    const deleteFile = (fileId: string) => {
        if (files.length <= 1) return;
        setFiles(prev => prev.filter(f => f.id !== fileId));
        if (selectedFile?.id === fileId) {
            const remainingFiles = files.filter(f => f.id !== fileId);
            if (remainingFiles.length > 0) {
                onSelectFile(remainingFiles[0]);
            }
        }
        if (editingFile?.id === fileId) {
            setEditingFile(null);
            setEditContent('');
        }
        console.log('Archivo eliminado:', fileId);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.html')) {
            alert('Por favor, selecciona solo archivos HTML (.html)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            const newFile: HTMLFile = {
                id: Date.now().toString(),
                name: file.name,
                path: `/${file.name}`,
                content: content,
                lastModified: new Date(file.lastModified)
            };

            setFiles(prev => [...prev, newFile]);
            onSelectFile(newFile);
            console.log('Archivo HTML cargado:', file.name);
        };

        reader.readAsText(file);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const startEditing = (file: HTMLFile) => {
        setEditingFile(file);
        setEditContent(file.content);
        console.log('Iniciando edición de:', file.name);
    };

    const saveEditedFile = () => {
        if (!editingFile) return;

        const updatedFile = {
            ...editingFile,
            content: editContent,
            lastModified: new Date()
        };

        setFiles(prev => prev.map(f =>
            f.id === editingFile.id ? updatedFile : f
        ));

        // Si es el archivo seleccionado, actualizarlo también
        if (selectedFile?.id === editingFile.id) {
            onSelectFile(updatedFile);
        }

        setEditingFile(null);
        setEditContent('');
        console.log('Archivo guardado:', editingFile.name);
    };

    const cancelEditing = () => {
        setEditingFile(null);
        setEditContent('');
    };

    // Si estamos editando un archivo, mostrar el editor
    if (editingFile) {
        return (
            <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-primary" />
                        <span className="font-medium">Editando: {editingFile.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" onClick={saveEditedFile} className="h-8">
                            <Save className="h-3 w-3 mr-1" />
                            Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing} className="h-8">
                            <X className="h-3 w-3 mr-1" />
                            Cancelar
                        </Button>
                    </div>
                </div>

                <div className="flex-1">
                    <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Contenido HTML..."
                        className="h-full min-h-96 font-mono text-xs resize-none"
                        style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <h3 className="text-lg font-semibold mb-2">Navegador de Archivos HTML</h3>
                <p className="text-sm text-muted-foreground">
                    Selecciona, crea, edita o sube archivos HTML para mostrar en el TV
                </p>
            </div>

            {/* Barra de búsqueda y controles */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar archivos HTML..."
                        className="pl-10 h-8 text-xs"
                    />
                </div>
                <Button
                    size="sm"
                    onClick={() => setIsCreatingFile(!isCreatingFile)}
                    className="h-8"
                >
                    <Plus className="h-3 w-3 mr-1" />
                    Nuevo
                </Button>
                <Button
                    size="sm"
                    onClick={triggerFileUpload}
                    className="h-8"
                    variant="outline"
                >
                    <Upload className="h-3 w-3 mr-1" />
                    Subir
                </Button>
            </div>

            {/* Input oculto para subir archivos */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".html"
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Crear nuevo archivo */}
            {isCreatingFile && (
                <Card className="p-3">
                    <div className="flex gap-2">
                        <Input
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="nombre-archivo.html"
                            className="h-8 text-xs"
                            onKeyDown={(e) => e.key === 'Enter' && createNewFile()}
                        />
                        <Button size="sm" onClick={createNewFile} className="h-8">
                            Crear
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsCreatingFile(false)}
                            className="h-8"
                        >
                            Cancelar
                        </Button>
                    </div>
                </Card>
            )}

            {/* Lista de archivos */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredFiles.map((file) => (
                    <Card
                        key={file.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedFile?.id === file.id ? 'ring-2 ring-primary' : ''
                            }`}
                        onClick={() => {
                            onSelectFile(file);
                            console.log('Archivo seleccionado:', file.name);
                        }}
                    >
                        <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <FileText className="h-4 w-4 text-orange-500 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <div className="font-medium text-sm truncate">{file.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">
                                            {file.path} • {file.lastModified.toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1 ml-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectFile(file);
                                            console.log('Cargando archivo en TV:', file.name);
                                        }}
                                        className="h-6 w-6 p-0"
                                        title="Cargar en TV"
                                    >
                                        <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startEditing(file);
                                        }}
                                        className="h-6 w-6 p-0"
                                        title="Editar archivo"
                                    >
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    {files.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFile(file.id);
                                            }}
                                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                            title="Eliminar archivo"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredFiles.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No se encontraron archivos HTML</p>
                    <p className="text-xs mt-2">Prueba buscar con un término diferente</p>
                </div>
            )}

            {/* Información del archivo seleccionado */}
            {selectedFile && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Eye className="h-4 w-4 text-primary" />
                            <span className="font-medium">Archivo activo:</span>
                            <span className="text-primary font-semibold">{selectedFile.name}</span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
