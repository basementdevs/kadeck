import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app/Sidebar.tsx";
import React, {useState} from "react";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import Deck from "@/pages/deck/deck.tsx";
import {useSaveProfileSettings} from "@/hooks/commands/use-save-profile-settings.ts";
import {DeviceTrigger, TriggerType} from "@/vite-env";
import {invoke} from "@tauri-apps/api/core";

interface DroppedItem {
    id: string;
    name: string;
    icon: React.ReactNode;
}

type Device = "streamdeckplus" | "streamdeck";


export function AppLayout() {

    const [device, setDevice] = useState<Device>("streamdeckplus");
    const [droppedItems, setDroppedItems] = useState<{ [key: string]: DroppedItem[] }>({});

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && over.id.startsWith('dropzone-')) {
            const dropzoneId = over.id as String;
            const [_, device, type, index] = dropzoneId.split('-');
            const item: DroppedItem = active.data.current?.item as DroppedItem;

            const payload = {
                action: `action-${item.name}`,
                trigger_type: type as TriggerType,
                key_code: parseInt(index),
                module: item.name,
                arguments: {}
            } as DeviceTrigger;

            invoke("save_profile_settings", {device: device, payload: payload})
                .then((_) => {
                    alert('saved')
                })
                .catch((error) => {
                    alert(error)
                });


            setDroppedItems((prev) => {
                const items = prev[dropzoneId] || [];
                return {
                    ...prev,
                    [dropzoneId]: [item],
                };
            });

        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SidebarProvider className="bg-gray-800">
                <div className="flex h-screen bg-gray-900 text-gray-300">
                    <AppSidebar/>
                    <div className={"flex"}>
                        <Deck droppedItems={droppedItems} selectedDevice={device}/>
                    </div>
                </div>
            </SidebarProvider>
        </DndContext>

    )
}