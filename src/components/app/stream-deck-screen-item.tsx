import DropZone from "@/pages/deck/deck-droppable-key";

interface DroppedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface StreamDeckScreenItemProps {
  dropzoneId: string;

  index: number;
  droppedItems?: {
    [key: string]: DroppedItem[];
  };
}

export function StreamDeckScreenItem({
  dropzoneId,
  droppedItems,
  index,
}: StreamDeckScreenItemProps) {
  return (
    <DropZone key={dropzoneId} id={dropzoneId}>
      <div key={index} className="bg-gray-900  rounded-xl px-4 py-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-400">Screen: {index}</span>
          {droppedItems?.[dropzoneId]?.map((item) => (
            <div key={item.id} className="text-white flex items-center">
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </DropZone>
  );
}
