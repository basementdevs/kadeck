import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export function DeckSettingsMicSection() {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h3 className="text-sm font-semibold mb-4">SETTINGS</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Mic Volume</span>
          <Button
            variant="outline"
            size="icon"
            className="border-2 border-gray-700 rounded-xl"
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
