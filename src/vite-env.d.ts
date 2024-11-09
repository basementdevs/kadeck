/// <reference types="vite/client" />

interface ModuleSettings {
    name: string;
    type: string; // `type` is a reserved keyword in TypeScript, so no need for special syntax.
    placeholder: string;
    value: string;
    order: number;
}

// Define ModuleAction interface
interface ModuleAction {
    name: string;
    description: string;
    settings: ModuleSettings[];
}

// Define Module interface
export interface Module {
    name: string;
    description: string;
    enabled: boolean;
    actions: ModuleAction[];
}
