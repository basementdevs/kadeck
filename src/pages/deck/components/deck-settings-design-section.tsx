import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Tag } from 'lucide-react';
import { DeckSettingsDesignAlignments } from './deck-settings-design-alignments';

interface DeckSettingsDesignSectionProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  fontSize: string;
  setFontSize: React.Dispatch<React.SetStateAction<string>>;
  fontFamily: string;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  alignment: string;
  setAlignment: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const fontFamilies = [
  {
    name: 'Default',
    value: 'Default',
  },
  {
    name: 'Arial',
    value: 'Arial',
  },
  {
    name: 'Helvetica',
    value: 'Helvetica',
  },
  {
    name: 'Times New Roman',
    value: 'Times New Roman',
  },
];

const inputStyle = 'border-2 border-gray-700 rounded-xl focus:border-gray-500';

export function DeckSettingsDesignSection({
  color,
  setColor,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  alignment,
  setAlignment,
  isActive,
  setIsActive,
}: DeckSettingsDesignSectionProps) {
  return (
    <div className='bg-gray-800 p-4 rounded-xl'>
      <h3 className='text-sm font-semibold mb-4 flex items-center'>
        <Tag className='w-4 h-4 mr-2' />
        DESIGN
      </h3>
      <div className='bg-gray-900 w-full aspect-square rounded-xl flex items-center justify-center mb-4 border-2 border-gray-700'>
        <span className='text-sm'>Mic Volume</span>
      </div>
      <ToggleGroup
        type='single'
        value={isActive ? 'active' : 'inactive'}
        onValueChange={(value) => setIsActive(value === 'active')}
        className='border-2 border-gray-700 rounded-xl'
      >
        <ToggleGroupItem
          value='active'
          className='w-full data-[state=on]:bg-lime-500 data-[state=on]:text-black transition-colors  rounded-l-xl'
        >
          ACTIVE
        </ToggleGroupItem>
        <ToggleGroupItem
          value='inactive'
          className='w-full transition-colors data-[state=on]:bg-red-700  rounded-r-xl'
        >
          INACTIVE
        </ToggleGroupItem>
      </ToggleGroup>
      <div className='space-y-2 mt-4'>
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className='border-2 border-gray-700 rounded-xl'>
            <SelectValue placeholder='Select font' />
          </SelectTrigger>
          <SelectContent className='bg-gray-800 border-gray-700 rounded-xl'>
            <SelectGroup>
              {fontFamilies.map((font) => {
                return (
                  <SelectItem className='cursor-pointer' key={font.value} value={font.value}>
                    {font.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='grid grid-cols-2 gap-2'>
          <Input
            type='number'
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className={inputStyle}
            placeholder='9 pt'
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className={inputStyle}>
                <div className='w-4 h-4 rounded' style={{ background: color }} /> {color}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[280px] bg-gray-800 border-2 border-gray-700'>
              <div className='flex flex-col space-y-2 border-gray-700'>
                <Input
                  type='color'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className='w-full h-[100px] border-none p-0 rounded'
                />

                <div className='flex gap-2 items-center'>
                  <div className='w-8 h-7 rounded' style={{ background: color }} />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className='col-span-2 h-8 rounded-xl border-2 border-gray-700 focus:border-gray-500'
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <DeckSettingsDesignAlignments alignment={alignment} setAlignment={setAlignment} />
      </div>
    </div>
  );
}
