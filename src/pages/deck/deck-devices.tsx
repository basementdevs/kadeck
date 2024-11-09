import {ResizablePanel} from "@/components/ui/resizable.tsx";
import { invoke } from '@tauri-apps/api/core';
import {Module, ModuleAction, ModuleSettings} from "@/vite-env";
import {useState} from "react";


export default function DeckDevices() {
    const [modules, setModules] = useState<Module[]>([]);

    invoke('get_modules').then((modules) => {
        setModules(modules as Module[]);
    });

    return (
        <ResizablePanel defaultSize={80} minSize={1}>
            <div className="h-full p-4 bg-gray-800">
                <h2 className="text-xl font-bold">Top Section (To be decided)</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {modules.map((module) => (
                        <div key={module.name} className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-lg font-bold">{module.name}</h3>
                            <p className="text-sm">{module.description}</p>
                            <div className="mt-4">
                                {module.actions.map((action) => (
                                    <div key={action.name} className="bg-gray-600 p-4 rounded-lg mt-2">
                                        <h4 className="text-lg font-bold">{action.name}</h4>
                                        <p className="text-sm">{action.description}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ResizablePanel>
    )
}