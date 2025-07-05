export const hotelWelcomeTemplate = {
  layout: 'tv',
  version: '1.0',
  elements: [
    {
      id: 'heading-1',
      type: 'heading',
      x: 100,
      y: 50,
      width: 800,
      height: 60,
      content: 'Estimado Huésped',
      styles: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#0033cc'
      }
    },
    {
      id: 'text-1',
      type: 'text',
      x: 100,
      y: 130,
      width: 800,
      height: 120,
      content: 'Te damos la bienvenida al hotel. Esperamos que tengas una excelente estadía.',
      styles: {
        fontSize: '16px',
        color: '#ffffff'
      }
    },
    {
      id: 'image-hotel',
      type: 'image',
      x: 100,
      y: 280,
      width: 300,
      height: 200,
      content: 'https://digital.ihg.com/is/image/ihg/intercontinental-san-salvador-5157422714-2x1'
    },
    {
      id: 'image-menu',
      type: 'image',
      x: 420,
      y: 280,
      width: 300,
      height: 200,
      content: 'https://www.templatetrip.com/wp-content/uploads/2023/10/999941-menu-design-service.webp'
    },
    {
      id: 'image-vuelos',
      type: 'image',
      x: 740,
      y: 280,
      width: 300,
      height: 200,
      content: 'https://fotografias.larazon.es/clipping/cmsimages02/2024/01/24/7523015D-F5DF-4A1D-9FBF-A125655508A9/calcula-que-dia-producen-120000-vuelos-aunque-numero-puede-ser-mayor_98.jpg?crop=4242,2387,x0,y221&width=1900&height=1069&optimize=low&format=webply'
    },
    {
      id: 'button-netflix',
      type: 'image',
      x: 100,
      y: 510,
      width: 140,
      height: 80,
      content: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    },
    {
      id: 'button-youtube',
      type: 'image',
      x: 260,
      y: 510,
      width: 140,
      height: 80,
      content: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg'
    },
    
    {
      id: 'event-weather',
      type: 'event',
      x: 900,
      y: 20,
      width: 150,
      height: 80,
      content: JSON.stringify({
        title: '13:16',
        description: '29.9°C ☁️ Despejado'
      })
    }
  ]
};
