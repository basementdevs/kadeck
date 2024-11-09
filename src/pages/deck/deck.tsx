import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ResizableHandle, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import DeckDevices from "@/pages/deck/deck-devices.tsx";
import DeckSettings from "@/pages/deck/deck-settings.tsx";

export default function Deck() {
    return (
        <div>
            <ResizablePanelGroup direction="vertical" >
                <SidebarTrigger  />
                <DeckDevices/>
                <ResizableHandle />
                <DeckSettings/>
            </ResizablePanelGroup>
        </div>
    )
}