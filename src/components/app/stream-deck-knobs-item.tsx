import DropZone from '@/pages/deck/deck-droppable-key';

interface DroppedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface StreamDeckKnobsItemProps {
  dropzoneId: string;

  index: number;
  droppedItems?: {
    [key: string]: DroppedItem[];
  };
}

export function StreamDeckKnobsItem({ dropzoneId, index, droppedItems }: StreamDeckKnobsItemProps) {
  return (
    <DropZone key={dropzoneId} id={dropzoneId} full>
      <div
        key={index}
        className='bg-gray-700 p-12  rounded-full h-20 w-20 flex items-center justify-center'
      >
        {droppedItems?.[dropzoneId]?.map((item) => (
          <div
            key={item.id}
            className='text-white flex items-center gap-2 flex-wrap justify-center'
          >
            {item.icon}
            <span className=''>{item.name}</span>
          </div>
        ))}
      </div>
    </DropZone>
  );
}
