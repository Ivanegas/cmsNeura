import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCMS } from '@/contexts/CMSContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EventSelectorDialogProps {
    open: boolean;
    onClose: () => void;
    onSelect: (event: any) => void;
    events: any[]; // 👈 agregar esta línea
}

export const EventSelectorDialog: React.FC<EventSelectorDialogProps> = ({
    open,
    onClose,
    onSelect,
    events // 👈 y esta
}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Seleccionar Evento</DialogTitle>
                    <DialogDescription>Elige un evento para insertar en la página</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    {events.map((event) => (
                        <Button
                            key={event.id}
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => onSelect(event)}
                        >
                            📅 {event.title}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
