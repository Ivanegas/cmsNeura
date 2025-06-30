import React from 'react';
import { useCMS } from '@/contexts/CMSContext';

interface EventPreviewProps {
    eventId: string;
}

export const EventPreview: React.FC<EventPreviewProps> = ({ eventId }) => {
    const { events } = useCMS();
    const event = events.find(e => e.id === eventId);

    if (!event) return <p className="text-white text-xs">🎫 Evento no encontrado</p>;

    return (
        <div className="p-2 text-left text-white text-sm">
            <div className="font-bold truncate">{event.title}</div>
            <div className="text-xs opacity-80">{event.location}</div>
            <div className="text-xs opacity-60">
                {new Date(event.start_date).toLocaleDateString()}
            </div>
        </div>
    );
};
