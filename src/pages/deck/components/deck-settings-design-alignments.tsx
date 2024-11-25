import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { AlignCenterVertical, AlignEndVertical, AlignStartVertical } from 'lucide-react';

interface DeckSettingsDesignAlignmentsProps {
  alignment: string;
  setAlignment: React.Dispatch<React.SetStateAction<string>>;
}

const alignmentList = [
  {
    value: 'top',
    Icon: AlignStartVertical,
  },
  {
    value: 'middle',
    Icon: AlignCenterVertical,
  },
  {
    value: 'bottom',
    Icon: AlignEndVertical,
  },
];

export function DeckSettingsDesignAlignments({
  alignment,
  setAlignment,
}: DeckSettingsDesignAlignmentsProps) {
  return (
    <div className='flex justify-between'>
      {alignmentList.map((alignmentData) => {
        return (
          <Button
            key={alignmentData.value}
            onClick={() => setAlignment(alignmentData.value)}
            variant={alignmentData.value === alignment ? 'default' : 'secondary'}
            className={clsx('rounded-xl', alignmentData.value === alignment && 'bg-gray-700')}
          >
            <alignmentData.Icon className='w-4 h-4' />
          </Button>
        );
      })}
    </div>
  );
}
