import { StreamDeckKeyItem } from "@/components/app/stream-deck-key-item";
import { StreamDeckKnobsItem } from "@/components/app/stream-deck-knobs-item";
import { StreamDeckScreenItem } from "@/components/app/stream-deck-screen-item";
import DropZone from "@/pages/deck/deck-droppable-key.tsx";
import { DeckDevice } from "@/vite-env";

interface DroppedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DeckDevicesProps {
  droppedItems?: { [key: string]: DroppedItem[] };
}

export default function StreamDeckPlus({ droppedItems }: DeckDevicesProps) {
  const streamDeckItems: DeckDevice = {
    name: "StreamDeckPlus",
    buttons: 8,
    screens: 1,
    knobs: 4,
  };

  // Generate a key for each dropzone
  // Example: dropzone-streamdeckplus-buttons-0
  const generateDropzoneIndexKey = (
    device: DeckDevice,
    type: string,
    index: number
  ) => {
    return `dropzone-${device.name.toLowerCase()}-${type}-${index}`;
  };

  const streamDeckButtonsDropzone = Array.from(
    { length: streamDeckItems.buttons },
    (_, index) => generateDropzoneIndexKey(streamDeckItems, "Button", index)
  );
  const streamDeckScreensDropzone = Array.from(
    { length: streamDeckItems.screens },
    (_, index) => generateDropzoneIndexKey(streamDeckItems, "Screen", index)
  );
  const streamDeckKnobsDropzone = Array.from(
    { length: streamDeckItems.knobs },
    (_, index) => generateDropzoneIndexKey(streamDeckItems, "Knob", index)
  );
  return (
    <div className="h-full p-4 bg-gray-800">
      <h2 className="text-xl font-bold">Top Section (To be decided)</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {streamDeckButtonsDropzone.map((dropzoneId, index) => (
          <div key={index}>
            <StreamDeckKeyItem
              index={index}
              dropzoneId={dropzoneId}
              key={dropzoneId}
              droppedItems={droppedItems}
            />
          </div>
        ))}
      </div>
      <div className={"mt-4"}>
        {streamDeckScreensDropzone.map((dropzoneId, index) => (
          <StreamDeckScreenItem
            index={index}
            dropzoneId={dropzoneId}
            droppedItems={droppedItems}
          />
        ))}
      </div>
      <div
        className={
          "mt-4  flex justify-around items-center align-center gap-4 rounded-xl bg-gray-900 py-2"
        }
      >
        {streamDeckKnobsDropzone.map((dropzoneId, index) => (
          <StreamDeckKnobsItem
            dropzoneId={dropzoneId}
            index={index}
            droppedItems={droppedItems}
          />
        ))}
      </div>
    </div>
  );
}
