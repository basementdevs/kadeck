use std::collections::HashMap;
use std::fmt::Display;

#[derive(Debug, Clone)]
enum DeviceType {
    StreamDeckPlus,
}

impl Display for DeviceType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", match self {
            DeviceType::StreamDeckPlus => "StreamDeckPlus".to_string(),
        })
    }
}

#[derive(Debug, Clone)]
enum TriggerType {
    Button,
    Knob,
    Display
}

#[derive(Debug, Clone)]
struct DeviceTrigger {
    name: String,
    trigger_type: TriggerType,
    key_code: i32,
    module: String,
    action: String,
    arguments: HashMap<String, String>,
}

#[derive(Debug, Clone)]
struct DeviceProfile {
    device_type: DeviceType,
    settings: Vec<DeviceTrigger>
}

#[derive(Debug, Clone)]
struct Profile {
    name: String,
    devices: Vec<DeviceProfile>,
}