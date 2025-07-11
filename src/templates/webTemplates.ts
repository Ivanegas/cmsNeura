export interface WebFile {
  name: string;
  type: 'html' | 'css' | 'js' | 'json' | 'image';
  content: string;
  path: string;
}

export interface WebTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  files: WebFile[];
  mainFile: string; // cual archivo mostrar en el TV
}

export const webTemplates: WebTemplate[] = [
  {
    id: 'hotel-hilton-complete',
    name: 'Hotel Hilton - Sitio Completo',
    description: 'Plantilla completa del hotel Hilton con múltiples páginas',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
    mainFile: 'index.html',
    files: [
      {
        name: 'index.html',
        type: 'html',
        path: '/index.html',
        content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hilton San Salvador - Bienvenido</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <div class="tv-interface">
        <header class="header">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-icon">H</div>
                </div>
                <div class="brand-info">
                    <h1>Hilton</h1>
                    <p>SAN SALVADOR</p>
                </div>
            </div>
            <div class="time-weather">
                <div class="time" id="currentTime">12:30</div>
                <div class="weather">
                    <span class="weather-icon">🌤️</span>
                    <span class="temperature">18.28°C</span>
                </div>
            </div>
        </header>

        <main class="main-content">
            <div class="main-cards">
                <div class="card welcome-card">
                    <div class="card-content">
                        <h2>Hilton Honors</h2>
                        <p>Únete a Hilton Honors y descubre todos los beneficios exclusivos que tenemos para ti!</p>
                        <button class="cta-button" onclick="navigateTo('honors.html')">Más información</button>
                    </div>
                </div>
                
                <div class="card flight-card" onclick="navigateTo('flights.html')">
                    <div class="card-overlay">
                        <h3>Flight status</h3>
                    </div>
                </div>
            </div>

            <div class="secondary-cards">
                <div class="small-card hotel-card" onclick="navigateTo('hotel.html')">
                    <div class="card-overlay">
                        <h4>Enjoy your Hotel</h4>
                    </div>
                </div>
                <div class="small-card menu-card" onclick="navigateTo('menu.html')">
                    <div class="card-overlay">
                        <h4>Menu and services</h4>
                    </div>
                </div>
                <div class="small-card discover-card" onclick="navigateTo('discover.html')">
                    <div class="card-overlay">
                        <h4>Discover El Salvador</h4>
                    </div>
                </div>
            </div>

            <div class="apps-section">
                <div class="app-icon streamtv">
                    <div class="app-content">
                        <div class="app-title">Stream</div>
                        <div class="app-subtitle">TV</div>
                    </div>
                </div>
                <div class="app-icon netflix">N</div>
                <div class="app-icon prime">prime video</div>
                <div class="app-icon disney">Disney+</div>
                <div class="app-icon youtube">YouTube</div>
                <div class="app-icon wifi">Wi-Fi</div>
            </div>
        </main>
    </div>
    <script src="scripts/main.js"></script>
</body>
</html>`
      },
      {
        name: 'honors.html',
        type: 'html',
        path: '/honors.html',
        content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hilton Honors - Programa de Lealtad</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <div class="tv-interface page-honors">
        <header class="header">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-icon">H</div>
                </div>
                <div class="brand-info">
                    <h1>Hilton Honors</h1>
                    <p>PROGRAMA DE LEALTAD</p>
                </div>
            </div>
            <button class="back-button" onclick="navigateTo('index.html')">← Volver</button>
        </header>

        <main class="honors-content">
            <div class="honors-hero">
                <h2>Bienvenido a Hilton Honors</h2>
                <p>Disfruta de beneficios exclusivos durante tu estadía</p>
            </div>
            
            <div class="benefits-grid">
                <div class="benefit-card">
                    <div class="benefit-icon">🏨</div>
                    <h3>Habitaciones Premium</h3>
                    <p>Upgrade gratuito disponible</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">🍽️</div>
                    <h3>Desayuno Gratis</h3>
                    <p>Para miembros Gold y Diamond</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">📶</div>
                    <h3>WiFi Premium</h3>
                    <p>Internet de alta velocidad</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-icon">🎁</div>
                    <h3>Puntos Dobles</h3>
                    <p>Gana más puntos por estadía</p>
                </div>
            </div>
        </main>
    </div>
    <script src="scripts/main.js"></script>
</body>
</html>`
      },
      {
        name: 'flights.html',
        type: 'html',
        path: '/flights.html',
        content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estado de Vuelos</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <div class="tv-interface page-flights">
        <header class="header">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-icon">✈️</div>
                </div>
                <div class="brand-info">
                    <h1>Flight Status</h1>
                    <p>AEROPUERTO INTERNACIONAL</p>
                </div>
            </div>
            <button class="back-button" onclick="navigateTo('index.html')">← Volver</button>
        </header>

        <main class="flights-content">
            <div class="flights-table">
                <div class="table-header">
                    <div class="col">Vuelo</div>
                    <div class="col">Destino</div>
                    <div class="col">Salida</div>
                    <div class="col">Estado</div>
                </div>
                <div class="flight-row">
                    <div class="col">AA 1234</div>
                    <div class="col">Miami</div>
                    <div class="col">14:30</div>
                    <div class="col status-ontime">A Tiempo</div>
                </div>
                <div class="flight-row">
                    <div class="col">UA 5678</div>
                    <div class="col">Houston</div>
                    <div class="col">16:45</div>
                    <div class="col status-delayed">Retrasado</div>
                </div>
                <div class="flight-row">
                    <div class="col">DL 9012</div>
                    <div class="col">Atlanta</div>
                    <div class="col">18:20</div>
                    <div class="col status-ontime">A Tiempo</div>
                </div>
            </div>
        </main>
    </div>
    <script src="scripts/main.js"></script>
</body>
</html>`
      },
      {
        name: 'main.css',
        type: 'css',
        path: '/styles/main.css',
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    overflow: hidden;
}

.tv-interface {
    width: 100vw;
    height: 100vh;
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop');
    background-size: cover;
    background-position: center;
    position: relative;
}

.tv-interface::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
}

.header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo {
    background: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
}

.logo-icon {
    width: 2rem;
    height: 2rem;
    background: #1e40af;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1rem;
}

.brand-info h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.brand-info p {
    font-size: 0.875rem;
    color: #d1d5db;
}

.time-weather {
    text-align: right;
}

.time {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.weather {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 1.25rem;
}

.main-content {
    position: relative;
    z-index: 2;
    padding: 0 4rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: calc(100vh - 8rem);
}

.main-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.card {
    height: 12rem;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.card:hover {
    transform: scale(1.05);
}

.welcome-card {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    position: relative;
}

.card-content {
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-content h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-content p {
    font-size: 0.875rem;
    color: #e5e7eb;
    margin-bottom: 1rem;
    line-height: 1.4;
}

.cta-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: flex-start;
}

.cta-button:hover {
    background: #2563eb;
}

.flight-card {
    background-image: url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=300&fit=crop');
    background-size: cover;
    background-position: center;
    position: relative;
}

.card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4));
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
}

.card-overlay h3 {
    font-size: 1.25rem;
    font-weight: bold;
}

.secondary-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.small-card {
    height: 8rem;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    position: relative;
}

.small-card:hover {
    transform: scale(1.05);
}

.hotel-card {
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop');
    background-size: cover;
    background-position: center;
}

.menu-card {
    background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop');
    background-size: cover;
    background-position: center;
}

.discover-card {
    background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop');
    background-size: cover;
    background-position: center;
}

.small-card .card-overlay h4 {
    font-size: 1.125rem;
    font-weight: 600;
}

.apps-section {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.app-icon {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.3s ease;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    font-weight: bold;
}

.app-icon:hover {
    transform: scale(1.1);
}

.streamtv {
    background: white;
    color: #374151;
}

.app-content {
    text-align: center;
}

.app-title {
    font-size: 0.75rem;
    font-weight: bold;
}

.app-subtitle {
    font-size: 0.625rem;
    color: #6b7280;
}

.netflix {
    background: #e50914;
    color: white;
    font-size: 1.5rem;
}

.prime {
    background: #232f3e;
    color: white;
    font-size: 0.75rem;
}

.disney {
    background: #113ccf;
    color: white;
    font-size: 0.875rem;
}

.youtube {
    background: #ff0000;
    color: white;
    font-size: 0.875rem;
}

.wifi {
    background: #4b5563;
    color: white;
    font-size: 0.75rem;
}

.back-button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Página Honors */
.honors-content {
    position: relative;
    z-index: 2;
    padding: 2rem 4rem;
    text-align: center;
}

.honors-hero h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.honors-hero p {
    font-size: 1.25rem;
    color: #d1d5db;
    margin-bottom: 3rem;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.benefit-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    transition: transform 0.3s ease;
}

.benefit-card:hover {
    transform: translateY(-0.5rem);
}

.benefit-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.benefit-card h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.benefit-card p {
    color: #d1d5db;
}

/* Página Flights */
.flights-content {
    position: relative;
    z-index: 2;
    padding: 2rem 4rem;
}

.flights-table {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 1rem;
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
}

.table-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    font-weight: bold;
    font-size: 1.125rem;
}

.flight-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 1.5rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s ease;
}

.flight-row:hover {
    background: rgba(255, 255, 255, 0.05);
}

.flight-row:last-child {
    border-bottom: none;
}

.col {
    display: flex;
    align-items: center;
    font-size: 1rem;
}

.status-ontime {
    color: #10b981;
    font-weight: bold;
}

.status-delayed {
    color: #ef4444;
    font-weight: bold;
}`
      },
      {
        name: 'main.js',
        type: 'js',
        path: '/scripts/main.js',
        content: `// Actualizar tiempo en tiempo real
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Función de navegación
function navigateTo(page) {
    console.log('Navegando a:', page);
    // En un entorno real, aquí se cargaría la nueva página
    // Por ahora solo registramos la navegación
    
    // Simular carga de página
    document.body.style.opacity = '0.7';
    setTimeout(() => {
        // Aquí se cargaría el contenido de la nueva página
        document.body.style.opacity = '1';
        console.log('Página cargada:', page);
    }, 300);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
    
    console.log('Plantilla web cargada correctamente');
});

// Efectos de hover para las tarjetas
document.querySelectorAll('.card, .small-card, .app-icon').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});`
      }
    ]
  },
  {
    id: 'business-center-complete',
    name: 'Business Center - Sitio Completo',
    description: 'Plantilla completa para centro de negocios',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop',
    mainFile: 'index.html',
    files: [
      {
        name: 'index.html',
        type: 'html',
        path: '/index.html',
        content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Center - Bienvenido</title>
    <link rel="stylesheet" href="styles/business.css">
</head>
<body>
    <div class="tv-interface business-theme">
        <header class="header">
            <div class="logo-section">
                <div class="logo business-logo">
                    <div class="logo-icon">BC</div>
                </div>
                <div class="brand-info">
                    <h1>Business Center</h1>
                    <p>EXECUTIVE SERVICES</p>
                </div>
            </div>
            <div class="time-weather">
                <div class="time" id="currentTime">12:30</div>
                <div class="location">Nueva York, USA</div>
            </div>
        </header>

        <main class="main-content">
            <div class="welcome-section">
                <h2>Bienvenido al Centro de Negocios</h2>
                <p>Servicios ejecutivos y espacios de trabajo premium</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card meeting-rooms">
                    <div class="service-icon">🏢</div>
                    <h3>Salas de Reuniones</h3>
                    <p>Espacios equipados con tecnología avanzada</p>
                </div>
                <div class="service-card business-services">
                    <div class="service-icon">📋</div>
                    <h3>Servicios Ejecutivos</h3>
                    <p>Impresión, escaneo y servicios de secretaría</p>
                </div>
                <div class="service-card workspaces">
                    <div class="service-icon">💼</div>
                    <h3>Espacios de Trabajo</h3>
                    <p>Oficinas privadas y espacios colaborativos</p>
                </div>
                <div class="service-card catering">
                    <div class="service-icon">☕</div>
                    <h3>Catering Ejecutivo</h3>
                    <p>Servicio de comidas para eventos corporativos</p>
                </div>
            </div>
        </main>
    </div>
    <script src="scripts/business.js"></script>
</body>
</html>`
      },
      {
        name: 'business.css',
        type: 'css',
        path: '/styles/business.css',
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    color: white;
    overflow: hidden;
}

.business-theme {
    background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop');
    background-size: cover;
    background-position: center;
}

.business-theme::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
}

.header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
}

.business-logo {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.logo-icon {
    color: white;
    font-weight: bold;
    font-size: 1rem;
}

.brand-info h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.time {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.location {
    font-size: 1rem;
    color: #d1d5db;
}

.main-content {
    position: relative;
    z-index: 2;
    padding: 2rem 4rem;
    text-align: center;
}

.welcome-section {
    margin-bottom: 3rem;
}

.welcome-section h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.welcome-section p {
    font-size: 1.25rem;
    color: #d1d5db;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.service-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.service-card:hover {
    transform: translateY(-0.5rem);
    background: rgba(255, 255, 255, 0.15);
}

.service-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.service-card h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.service-card p {
    color: #d1d5db;
    line-height: 1.4;
}`
      },
      {
        name: 'business.js',
        type: 'js',
        path: '/scripts/business.js',
        content: `function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
    
    console.log('Business Center template loaded');
});`
      }
    ]
  }
];
