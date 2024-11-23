import { ResizablePanel } from '@/components/ui/resizable.tsx';
import { useState } from 'react';
import { DeckSettingsDesignSection } from './components/deck-settings-design-section';
import { DeckSettingsHeader } from './components/deck-settings-header';
import { DeckSettingsMicSection } from './components/deck-settings-mic-section';

export default function DeckSettings() {
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [color, setColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState('9');
  const [fontFamily, setFontFamily] = useState('Default');
  const [alignment, setAlignment] = useState('middle');
  const [isActive, setIsActive] = useState(true);
  return (
    <ResizablePanel defaultSize={20} minSize={5} className=' '>
      <div className='h-full overflow-scroll  bg-gray-800 p-4 px-14 '>
        <div className='bg-gray-900 rounded-xl '>
          <DeckSettingsHeader
            title='Audio mixer'
            isConfigOpen={isConfigOpen}
            setIsConfigOpen={setIsConfigOpen}
          />

          {isConfigOpen && (
            <div className='p-4'>
              <div className='grid grid-cols-2 gap-4'>
                <DeckSettingsDesignSection
                  color={color}
                  setColor={setColor}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  fontFamily={fontFamily}
                  setFontFamily={setFontFamily}
                  alignment={alignment}
                  setAlignment={setAlignment}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />

                <DeckSettingsMicSection />
              </div>
            </div>
          )}
        </div>
      </div>
    </ResizablePanel>
  );
}
