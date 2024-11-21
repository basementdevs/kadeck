import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  ChevronDown,
  Link,
  Mic,
  Tag,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { ResizablePanel } from "@/components/ui/resizable.tsx";
import { useState } from "react";
import clsx from "clsx";

export default function DeckSettings() {
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [color, setColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState("9");
  const [fontFamily, setFontFamily] = useState("Default");
  const [alignment, setAlignment] = useState("middle");
  const [isActive, setIsActive] = useState(true);
  return (
    <ResizablePanel defaultSize={20} minSize={5} className=" ">
      <div className="h-full overflow-scroll  bg-gray-800 p-4 px-14 ">
        <div className="bg-gray-900 rounded-xl ">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-lime-500 p-2 rounded-xl">
                <Mic className="w-6 h-6 text-black" />
              </div>
              <span className="font-semibold">Audio Mixer</span>
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
          {isConfigOpen && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-semibold mb-4 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    DESIGN
                  </h3>
                  <div className="bg-gray-900 w-full aspect-square rounded-xl flex items-center justify-center mb-4 border-2 border-gray-700">
                    <span className="text-sm">Mic Volume</span>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={isActive ? "active" : "inactive"}
                    onValueChange={(value) => setIsActive(value === "active")}
                    className="border-2 border-gray-700 rounded-xl"
                  >
                    <ToggleGroupItem
                      value="active"
                      className="w-full data-[state=on]:bg-lime-500 data-[state=on]:text-black transition-colors  rounded-l-xl"
                    >
                      ACTIVE
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="inactive"
                      className="w-full transition-colors data-[state=on]:bg-red-700  rounded-r-xl"
                    >
                      INACTIVE
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <div className="space-y-2 mt-4">
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="border-2 border-gray-700 rounded-xl">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectGroup>
                          <SelectItem
                            value="Default"
                            className="cursor-pointer hover:text-red-800"
                          >
                            Default
                          </SelectItem>
                          <SelectItem value="Arial" className="cursor-pointer">
                            Arial
                          </SelectItem>
                          <SelectItem
                            value="Helvetica"
                            className="cursor-pointer"
                          >
                            Helvetica
                          </SelectItem>
                          <SelectItem
                            value="Times New Roman"
                            className="cursor-pointer"
                          >
                            Times New Roman
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-700 focus:border-gray-500"
                        placeholder="9 pt"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full rounded-xl border-2 border-gray-700 focus:border-gray-500"
                          >
                            <div
                              className="w-4 h-4 rounded"
                              style={{ background: color }}
                            />{" "}
                            {color}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] bg-gray-800 border-2 border-gray-700">
                          <div className="flex flex-col space-y-2 border-gray-700">
                            <Input
                              type="color"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              className="w-full h-[100px] border-none p-0 rounded"
                            />

                            <div className="flex gap-2 items-center">
                              <div
                                className="w-8 h-7 rounded"
                                style={{ background: color }}
                              />
                              <Input
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="col-span-2 h-8 rounded-xl border-2 border-gray-700 focus:border-gray-500"
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant={alignment === "top" ? "default" : "secondary"}
                        size="icon"
                        className={clsx(
                          "rounded-xl",
                          alignment === "top" && "bg-gray-700"
                        )}
                        onClick={() => setAlignment("top")}
                      >
                        <AlignStartVertical className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={
                          alignment === "middle" ? "default" : "secondary"
                        }
                        size="icon"
                        className={clsx(
                          "rounded-xl",
                          alignment === "middle" && "bg-gray-700"
                        )}
                        onClick={() => setAlignment("middle")}
                      >
                        <AlignCenterVertical className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={
                          alignment === "bottom" ? "default" : "secondary"
                        }
                        size="icon"
                        className={clsx(
                          "rounded-xl",
                          alignment === "bottom" && "bg-gray-700"
                        )}
                        onClick={() => setAlignment("bottom")}
                      >
                        <AlignEndVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </ResizablePanel>
  );
}
