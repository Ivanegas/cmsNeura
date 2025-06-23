import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabaseClient';

// ==== Interfaces ====

interface Event {
  id: string;
  title: string;
  description?: string;
  hotel_id: string;
  start_date: string;
  end_date?: string;
  location?: string;
  event_type: string;
  status: 'active' | 'inactive' | 'cancelled';
  max_capacity?: number;
  current_attendees: number;
  price?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  image_urls?: string[]; // UI only, no DB
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadDate: string;
  alt?: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'review';
  author: string;
  lastModified: string;
  views: number;
  content?: string;
}

interface Room {
  id: string;
  number: string;
  type: string;
  hotelId: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
}

interface Platform {
  id: string;
  name: string;
  type: string;
  hotel: string;
  username: string;
  password: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ==== Context Type ====

interface CMSContextType {
  pages: Page[];
  addPage: (page: Omit<Page, 'id'>) => Promise<void>;
  updatePage: (id: string, updates: Partial<Page>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  fetchPages: () => Promise<void>;

  rooms: Room[];
  platforms: Platform[];
  media: MediaItem[];
  hotels: Hotel[];
  events: Event[];
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// ==== Hook ====

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

// ==== Provider ====

interface CMSProviderProps {
  children: ReactNode;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  // ==== Eventos ====
  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error('❌ Error al obtener eventos:', error.message);
    } else {
      setEvents(data as Event[]);
    }
  };

  const addEvent = async (
    event: Omit<Event, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const { image_urls, ...rest } = event as any;
    const { error } = await supabase.from('events').insert({
      ...rest,
      image_url: image_urls?.[0] || null,
      current_attendees: 0,
    });

    if (error) throw new Error(error.message);
    await fetchEvents();
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    const { image_urls, ...rest } = updates as any;
    const { error } = await supabase
      .from('events')
      .update({
        ...rest,
        image_url: image_urls?.[0] || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw new Error(error.message);
    await fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw new Error(error.message);
    await fetchEvents();
  };

  // ==== Páginas ====
  const fetchPages = async () => {
    const { data, error } = await supabase.from('pages').select('*');
    if (error) {
      console.error('❌ Error al obtener páginas:', error.message);
    } else {
      setPages(data as Page[]);
    }
  };

  const addPage = async (page: Omit<Page, 'id'>) => {
    const { error } = await supabase.from('pages').insert(page);
    if (error) throw new Error(error.message);
    await fetchPages();
  };

  const updatePage = async (id: string, updates: Partial<Page>) => {
    const { error } = await supabase.from('pages').update(updates).eq('id', id);
    if (error) throw new Error(error.message);
    await fetchPages();
  };

  const deletePage = async (id: string) => {
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) throw new Error(error.message);
    await fetchPages();
  };

  useEffect(() => {
    fetchEvents();
    fetchPages();
    // puedes agregar fetchHotels, fetchMedia, etc. aquí también
  }, []);

  return (
    <CMSContext.Provider
      value={{
        pages,
        addPage,
        updatePage,
        deletePage,
        fetchPages,

        rooms,
        platforms,
        media,
        hotels,
        events,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
