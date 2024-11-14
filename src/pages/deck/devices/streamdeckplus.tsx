import DropZone from "@/pages/deck/deck-droppable-key.tsx";
import {DeckDevice} from "@/vite-env";

interface DroppedItem {
    id: string;
    name: string;
    icon: React.ReactNode;
}

interface DeckDevicesProps {
    droppedItems?: { [key: string]: DroppedItem[] }
}


export default function StreamDeckPlus({droppedItems}: DeckDevicesProps) {

    const streamDeckItems: DeckDevice = {
        name: "StreamDeckPlus",
        buttons: 8,
        screens: 1,
        knobs: 4
    }

    // Generate a key for each dropzone
    // Example: dropzone-streamdeckplus-buttons-0
    const generateDropzoneIndexKey = (device: DeckDevice, type: string, index: number) => {
        return `dropzone-${device.name.toLowerCase()}-${type}-${index}`;
    }

    const streamDeckButtonsDropzone = Array.from({length: streamDeckItems.buttons}, (_, index) => generateDropzoneIndexKey(streamDeckItems, "Button", index));
    const streamDeckScreensDropzone = Array.from({length: streamDeckItems.screens}, (_, index) => generateDropzoneIndexKey(streamDeckItems, "Screen", index));
    const streamDeckKnobsDropzone = Array.from({length: streamDeckItems.knobs}, (_, index) => generateDropzoneIndexKey(streamDeckItems, "Knob", index));
    return (
        <div className="h-full p-4 bg-gray-800">
            <h2 className="text-xl font-bold">Top Section (To be decided)</h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {streamDeckButtonsDropzone.map((dropzoneId, index) => (
                    <div key={index}>
                        <DropZone key={dropzoneId} id={dropzoneId}>
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <div className="mt-4">
                                    <div className="bg-gray-600 p-4 rounded-lg mt-2">
                                        Key: {index}
                                    </div>
                                    {droppedItems[dropzoneId]?.map((item) => (
                                        <div key={item.id} className="text-white flex items-center">
                                            {item.icon}
                                            <span className="ml-2">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DropZone>
                    </div>
                ))}
            </div>
            <div className={"mt-4"}>
                {streamDeckScreensDropzone.map((dropzoneId, index) => (
                    <div key={index}>
                        <DropZone key={dropzoneId} id={dropzoneId}>
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <div className="mt-4">
                                    <div className="bg-gray-600 p-4 rounded-lg mt-2">
                                        Screen: {index}
                                    </div>
                                    {droppedItems[dropzoneId]?.map((item) => (
                                        <div key={item.id} className="text-white flex items-center">
                                            {item.icon}
                                            <span className="ml-2">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DropZone>
                    </div>
                ))}
            </div>
            <div className={"mt-4  flex justify-around items-center align-center gap-4 rounded-full bg-gray-900"}>
                {streamDeckKnobsDropzone.map((dropzoneId, index) => (
                    <div className={"rounded-full "} key={index}>
                        <DropZone key={dropzoneId} id={dropzoneId}>
                            <div key={index} className="bg-gray-700 p-10  rounded-full">
                                {droppedItems[dropzoneId]?.map((item) => (
                                    <div key={item.id} className="text-white flex items-center">
                                        {item.icon}
                                        <span className="ml-2">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </DropZone>
                    </div>
                ))}
            </div>
        </div>
    )
}

