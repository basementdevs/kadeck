// DropZone.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
    id: string;
    children: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    const style = {
        backgroundColor: isOver ? '#4a5568' : undefined, // Darken when an item is over
    };

    return (
        <div
            ref={setNodeRef}
            id={id}
            style={style}
        >
            {children}
        </div>
    );
};

export default DropZone;
