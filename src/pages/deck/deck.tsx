import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import DeckDevices from "@/pages/deck/deck-devices.tsx";
import DeckSettings from "@/pages/deck/deck-settings.tsx";
import React from "react";
import StreamDeckPlus from "@/pages/deck/devices/streamdeckplus.tsx";

interface DroppedItem {
    id: string;
    name: string;
    icon: React.ReactNode;
}

interface DeckProps {
    droppedItems?: { [key: string]: DroppedItem[] },
    selectedDevice?: "streamdeckplus" | "streamdeck"
}

export default function Deck(props: DeckProps) {
    return (
        <div>
            <ResizablePanelGroup direction="vertical">
                <SidebarTrigger/>
                <ResizablePanel defaultSize={0} minSize={0}>
                    {props.selectedDevice === "streamdeckplus" && <StreamDeckPlus droppedItems={props.droppedItems}/>}
                </ResizablePanel>
                <ResizableHandle/>
                <DeckSettings/>
            </ResizablePanelGroup>
        </div>
    )
}