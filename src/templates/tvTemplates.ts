
export interface TVTemplateData {
  logo: string;
  backgroundImage: string;
  cards: {
    welcome: { image: string; title: string; subtitle?: string; buttonText?: string; size?: number; position?: 'left' | 'center' | 'right' };
    flights: { image: string; title: string; subtitle?: string; buttonText?: string; size?: number; position?: 'left' | 'center' | 'right' };
    hotel: { image: string; title: string; subtitle?: string; buttonText?: string; size?: number; position?: 'left' | 'center' | 'right' };
    menu: { image: string; title: string; subtitle?: string; buttonText?: string; size?: number; position?: 'left' | 'center' | 'right' };
    discover: { image: string; title: string; subtitle?: string; buttonText?: string; size?: number; position?: 'left' | 'center' | 'right' };
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
    enabled?: boolean;
    format?: '12h' | '24h';
  };
}

export interface TVTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  data: TVTemplateData;
  createdAt: Date;
}

export const defaultTVTemplates: TVTemplate[] = [
  {
    id: 'hotel-hilton',
    name: 'Hotel Hilton',
    description: 'Plantilla elegante para hoteles con información completa',
    thumbnail: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=300&h=200&fit=crop',
    data: {
      logo: '/placeholder.svg',
      backgroundImage: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=1920&h=1080&fit=crop',
      cards: {
        welcome: { 
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop', 
          title: 'Welcome',
          subtitle: 'Bienvenido a una experiencia única de hospitalidad',
          buttonText: 'Explorar servicios'
        },
        flights: { 
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop', 
          title: 'Flight status',
          subtitle: 'Consulta el estado de tu vuelo en tiempo real',
          buttonText: 'Ver vuelos'
        },
        hotel: { 
          image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop', 
          title: 'Enjoy your Hotel',
          subtitle: 'Descubre todas las comodidades de tu habitación',
          buttonText: 'Servicios de habitación'
        },
        menu: { 
          image: '/placeholder.svg', 
          title: 'Menu and services',
          subtitle: 'Explora nuestro menú y servicios adicionales',
          buttonText: 'Ver menú'
        },
        discover: { 
          image: '/placeholder.svg', 
          title: 'Discover El Salvador',
          subtitle: 'Conoce los mejores lugares para visitar',
          buttonText: 'Explorar destinos'
        },
      },
      apps: {
        streamtv: { image: '/placeholder.svg', name: 'Stream TV' },
        netflix: { image: '/placeholder.svg', name: 'Netflix' },
        primevideo: { image: '/placeholder.svg', name: 'Prime Video' },
        disney: { image: '/placeholder.svg', name: 'Disney+' },
        youtube: { image: '/placeholder.svg', name: 'YouTube' },
        wifi: { image: '/placeholder.svg', name: 'Wi-Fi' },
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
    },
    createdAt: new Date()
  },
  {
    id: 'business-center',
    name: 'Business Center',
    description: 'Plantilla profesional para centros de negocios',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop',
    data: {
      logo: '/placeholder.svg',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
      cards: {
        welcome: { 
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop', 
          title: 'Welcome to Business Center',
          subtitle: 'Tu espacio de trabajo profesional',
          buttonText: 'Comenzar'
        },
        flights: { 
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop', 
          title: 'Travel Information',
          subtitle: 'Información de viajes y transportes',
          buttonText: 'Ver información'
        },
        hotel: { 
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop', 
          title: 'Meeting Rooms',
          subtitle: 'Salas equipadas para reuniones ejecutivas',
          buttonText: 'Reservar sala'
        },
        menu: { 
          image: '/placeholder.svg', 
          title: 'Business Services',
          subtitle: 'Servicios empresariales especializados',
          buttonText: 'Ver servicios'
        },
        discover: { 
          image: '/placeholder.svg', 
          title: 'Local Attractions',
          subtitle: 'Lugares de interés cercanos',
          buttonText: 'Explorar'
        },
      },
      apps: {
        streamtv: { image: '/placeholder.svg', name: 'Stream TV' },
        netflix: { image: '/placeholder.svg', name: 'Netflix' },
        primevideo: { image: '/placeholder.svg', name: 'Prime Video' },
        disney: { image: '/placeholder.svg', name: 'Disney+' },
        youtube: { image: '/placeholder.svg', name: 'YouTube' },
        wifi: { image: '/placeholder.svg', name: 'Wi-Fi' },
      },
      weather: {
        enabled: false,
        location: 'New York, USA',
        country: 'US'
      },
      time: {
        enabled: true,
        format: '12h'
      }
    },
    createdAt: new Date()
  }
];
