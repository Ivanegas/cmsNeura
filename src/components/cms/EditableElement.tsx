import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Move, Edit3 } from 'lucide-react';

interface EditableElementProps {
  element: {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    content: any; // string o objeto para eventos
    styles?: any;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onEditEvent?: (elementId: string) => void;// Callback opcional para editar eventos
}

export const EditableElement: React.FC<EditableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onEditEvent,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    typeof element.content === 'string' ? element.content : ''
  );
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!dragRef.current?.contains(target)) return;

    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    onSelect(element.id);

    const rect = dragRef.current?.parentElement?.getBoundingClientRect();
    if (rect) {
      startPos.current = {
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const rect = dragRef.current?.parentElement?.getBoundingClientRect();
      if (rect) {
        const newX = e.clientX - rect.left - startPos.current.x;
        const newY = e.clientY - rect.top - startPos.current.y;
        onUpdate(element.id, {
          x: Math.max(0, Math.min(newX, rect.width - element.width)),
          y: Math.max(0, Math.min(newY, rect.height - element.height))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (element.type === 'text' || element.type === 'heading') {
      setIsEditing(true);
      setEditValue(element.content);
    }

    if (element.type === 'event') {
      // 🔥 Notifica al padre que queremos abrir el modal de eventos
      if (onEditEvent) {
        onEditEvent(element.id); // 👈 pasamos el ID
      }
    }
  };

  const handleEditSave = () => {
    onUpdate(element.id, { content: editValue });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(element.content);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(element.id);
  };

  const handleElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id);
  };

  const renderContent = () => {
    if (isEditing && (element.type === 'text' || element.type === 'heading')) {
      return (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Enter') handleEditSave();
            if (e.key === 'Escape') handleEditCancel();
          }}
          className="w-full h-full border-none shadow-none p-1 text-white bg-transparent focus:ring-2 focus:ring-blue-400"
          autoFocus
        />
      );
    }

    switch (element.type) {
      case 'text':
        return <p className="w-full h-full p-2 text-sm text-white">{element.content}</p>;
      case 'heading':
        return <h2 className="w-full h-full p-2 text-lg font-bold text-white">{element.content}</h2>;
      case 'image':
        return (
          <img
            src={element.content}
            alt="Elemento imagen"
            className="w-full h-full object-cover rounded"
            style={element.styles}
          />
        );
      case 'button':
        return (
          <button
            className="w-full h-full bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium"
            style={element.styles}
          >
            {element.content}
          </button>
        );
      case 'video':
        return (
          <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center text-white text-xs">
            📹 {element.content}
          </div>
        );
      case 'link':
        return (
          <a className="w-full h-full flex items-center justify-center text-blue-400 underline text-sm">
            {element.content}
          </a>
        );
      case 'list':
        return (
          <ul className="w-full h-full p-2 text-white text-sm">
            <li>• {element.content}</li>
          </ul>
        );
      case 'container':
        return (
          <div className="w-full h-full border-2 border-dashed border-gray-500 rounded p-2 text-sm text-white">
            {element.content}
          </div>
        );
      case 'event':
        try {
          const eventData = JSON.parse(element.content);
          return (
            <div
              className="w-full h-full bg-purple-800 text-white rounded p-2 cursor-pointer"
              onDoubleClick={() => onEditEvent?.(element.id)}
              title={eventData.description}
            >
              <div className="font-bold text-sm truncate">{eventData.title || 'Evento sin título'}</div>
              <div className="text-xs truncate">{eventData.description || 'Sin descripción'}</div>
            </div>
          );
        } catch {
          return (
            <div className="w-full h-full bg-red-600 text-white rounded flex items-center justify-center text-xs">
              ⚠️ Evento inválido
            </div>
          );
        }


      default:
        return <div className="w-full h-full flex items-center justify-center text-gray-400">{element.type}</div>;
    }
  };

  return (
    <div
      ref={dragRef}
      className={`absolute cursor-move group transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-70 shadow-lg' : ''
        } ${isDragging ? 'scale-105 shadow-xl z-50' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex: isSelected ? 10 : isDragging ? 50 : 1
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleElementClick}
    >
      <div
        className={`w-full h-full bg-gray-800 rounded overflow-hidden border ${isSelected ? 'border-blue-400' : 'border-transparent group-hover:border-blue-300'
          }`}
      >
        {renderContent()}
      </div>

      {isSelected && !isEditing && (
        <div className="absolute -top-10 left-0 flex gap-1 bg-white border rounded shadow-lg z-20">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Move className="w-4 h-4" />
          </Button>
          {(element.type === 'text' || element.type === 'heading') && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {isSelected && !isEditing && (
        <>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 cursor-se-resize rounded-full border-2 border-white shadow" />
          <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-blue-500 cursor-s-resize rounded-full border-2 border-white shadow -translate-x-1/2" />
          <div className="absolute -right-1 top-1/2 w-3 h-3 bg-blue-500 cursor-e-resize rounded-full border-2 border-white shadow -translate-y-1/2" />
        </>
      )}
    </div>
  );
};
