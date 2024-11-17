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

interface DeviceTrigger {
    trigger_type: TriggerType;
    key_code: number;
    module: string;
    action: string;
    arguments: Record<string, string>;
}

interface DeviceProfile {
    device_type: DeviceType;
    settings: DeviceTrigger[];
}

interface Profile {
    id: string;
    name: string;
    devices: DeviceProfile[];
    created_at: Date;
}

interface ProfileManager {
    profiles: Profile[];
    selected_profile: string | null;
}

enum DeviceType {
    StreamDeckPlus = "StreamDeckPlus",
}

enum TriggerType {
    Button = "Button",
    Knob = "Knob",
    Display = "Display",
}

type DeckDevice = {
    name: string;
    buttons: number;
    screens: number;
    knobs: number;
}