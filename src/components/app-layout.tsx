import { AppSidebar } from '@/components/app/Sidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import Deck from '@/pages/deck/deck.tsx';
import type { DeviceTrigger, TriggerType } from '@/vite-env';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { invoke } from '@tauri-apps/api/core';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DroppedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

type Device = 'streamdeckplus' | 'streamdeck';

export function AppLayout() {
  const [device, setDevice] = useState<Device>('streamdeckplus');
  const [droppedItems, setDroppedItems] = useState<{
    [key: string]: DroppedItem[];
  }>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id.startsWith('dropzone-')) {
      const dropzoneId = over.id as string;
      const [_, device, type, index] = dropzoneId.split('-');
      const item: DroppedItem = active.data.current?.item as DroppedItem;

      const payload = {
        action: `action-${item.name}`,
        trigger_type: type as TriggerType,
        key_code: Number.parseInt(index),
        module: item.name,
        arguments: {},
      } as DeviceTrigger;

      invoke('save_profile_settings', { device: device, payload: payload })
        .then((_) => {
          toast.success('Saved');
        })
        .catch((error) => {
          toast.error(error);
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
      <SidebarProvider className='flex h-screen w-full bg-gray-800 text-gray-300 '>
        <AppSidebar />
        <Deck droppedItems={droppedItems} selectedDevice={device} />
        <Toaster richColors closeButton />
      </SidebarProvider>
    </DndContext>
  );
}
