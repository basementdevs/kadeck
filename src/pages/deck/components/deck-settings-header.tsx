import { Button } from "@/components/ui/button";
import { ChevronDown, Mic, Trash } from "lucide-react";

interface DeckSettingsHeaderProps {
  title: string;
  isConfigOpen: boolean;
  setIsConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeckSettingsHeader({
  title,
  isConfigOpen,
  setIsConfigOpen,
}: DeckSettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="bg-lime-500 p-2 rounded-xl">
          <Mic className="w-6 h-6 text-black" />
        </div>
        <span className="font-semibold">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Trash className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsConfigOpen(!isConfigOpen)}
        >
          <ChevronDown
            className={`w-5 h-5 transform transition-transform ${
              isConfigOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
}
