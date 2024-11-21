import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import DeckSettings from "@/pages/deck/deck-settings.tsx";
import React from "react";
import StreamDeckPlus from "@/pages/deck/devices/streamdeckplus.tsx";

interface DroppedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DeckProps {
  droppedItems?: { [key: string]: DroppedItem[] };
  selectedDevice?: "streamdeckplus" | "streamdeck";
}

export default function Deck(props: DeckProps) {
  return (
    <div className="h-screen w-full overflow-auto ">
      <ResizablePanelGroup direction="vertical">
        <SidebarTrigger className="bg-gray-800 hover:bg-gray-900 transition-colors p-6" />
        <ResizablePanel defaultSize={0} minSize={0} className="px-10  ">
          {props.selectedDevice === "streamdeckplus" && (
            <StreamDeckPlus droppedItems={props.droppedItems} />
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <DeckSettings />
      </ResizablePanelGroup>
    </div>
  );
}
