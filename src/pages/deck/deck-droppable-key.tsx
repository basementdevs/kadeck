// DropZone.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

interface DropZoneProps {
  id: string;
  children: React.ReactNode;
  full?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ id, children, full }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      id={id}
      className={clsx(
        " border-2 border-transparent transition-colors",
        full ? "rounded-full" : "rounded-xl",
        isOver && " border-gray-500 cursor-grabbing"
      )}
    >
      {children}
    </div>
  );
};

export default DropZone;
