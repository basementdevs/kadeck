import DropZone from '@/pages/deck/deck-droppable-key';

interface DroppedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface StreamDeckKeyItemProps {
  dropzoneId: string;

  index: number;
  droppedItems?: {
    [key: string]: DroppedItem[];
  };
}

export function StreamDeckKeyItem({ dropzoneId, index, droppedItems }: StreamDeckKeyItemProps) {
  return (
    <DropZone key={dropzoneId} id={dropzoneId}>
      <div className=' bg-gray-900 rounded-xl px-4 py-3 h-20 flex flex-col gap-2'>
        <span className='text-sm text-gray-400'>Key: {index}</span>
        {droppedItems?.[dropzoneId]?.map((item) => (
          <div key={item.id} className='text-white flex items-center '>
            {item.icon}
            <span className='ml-2'>{item.name}</span>
          </div>
        ))}
      </div>
    </DropZone>
  );
}
