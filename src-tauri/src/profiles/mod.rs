pub mod actions;

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt::Display;
use chrono::{DateTime, NaiveDateTime, Utc};
use log::{error, info};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
enum DeviceType {
    StreamDeckPlus,
}

impl DeviceType {
    fn from_str(s: &str) -> Option<DeviceType> {
        match s {
            "streamdeckplus" => Some(DeviceType::StreamDeckPlus),
            _ => None,
        }
    }
}

impl Display for DeviceType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                DeviceType::StreamDeckPlus => "StreamDeckPlus".to_string(),
            }
        )
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
enum TriggerType {
    Button,
    Knob,
    Display,
}

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
pub struct DeviceTrigger {
    trigger_type: TriggerType,
    key_code: i32,
    module: String, // OBS
    action: String, // Start Streaming
    arguments: HashMap<String, String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
struct DeviceProfile {
    device_type: DeviceType,
    settings: Vec<DeviceTrigger>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
pub struct Profile {
    pub id: Uuid,
    pub name: String,
    devices: Option<Vec<DeviceProfile>>,
    created_at: DateTime<Utc>,
}

impl Profile {
    fn new() -> Profile {
        Profile {
            id: Uuid::new_v4(),
            name: "Default".to_string(),
            devices: None,
            created_at: Utc::now(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
pub struct ProfileManager {
    profiles: Option<Vec<Profile>>,
    pub selected_profile: Option<Uuid>,
}

impl ProfileManager {
    pub fn new() -> Self {
        let profile = Profile::new();
        ProfileManager {
            profiles: Some(vec![profile.clone(), Profile::new()]),
            selected_profile: Some(profile.id),
        }
    }

    pub fn from_json(json: &str) -> Self {
        serde_json::from_str(json).unwrap()
    }

    pub fn from_value(value: serde_json::Value) -> Result<Self, serde_json::Error> {
        match serde_json::from_value(value.clone()) {
            Ok(manager) => {
                info!("Successfully deserialized ProfileManager: {:?}", manager);
                Ok(manager)
            }
            Err(e) => {
                error!("Failed to deserialize ProfileManager: {}", e);
                Err(e)
            }
        }
    }

    pub fn find_profile(&self, id: &Uuid) -> Option<&Profile> {
        if let Some(profiles) = &self.profiles {
            for profile in profiles {
                if profile.id == *id {
                    return Some(profile);
                }
            }
        }
        None
    }

    fn add_profile(&mut self, profile: Profile) {
        self.profiles.get_or_insert(vec![]).push(profile);
    }

    fn get_profile(&self, name: &str) -> Option<&Profile> {
        if let Some(profiles) = &self.profiles {
            for profile in profiles {
                if profile.name == name {
                    return Some(profile);
                }
            }
        }
        None
    }

    pub fn update_active_profile_settings(
        &mut self,
        device: DeviceType,
        device_trigger: DeviceTrigger,
    ) {
        if let Some(selected_profile_id) = self.selected_profile {
            if let Some(active_profile) = self
                .profiles
                .as_mut()
                .and_then(|profiles| profiles.iter_mut().find(|p| p.id == selected_profile_id))
            {
                if let Some(devices) = active_profile.devices.as_mut() {
                    for device_profile in devices.iter_mut() {
                        if device_profile.device_type == device {
                            // Remove triggers with the same key_code
                            device_profile
                                .settings
                                .retain(|trigger| trigger.key_code != device_trigger.key_code);

                            // Add the new device_trigger
                            device_profile.settings.push(device_trigger.clone());
                        }
                    }
                } else {
                    // If the devices vector is None, initialize it with a new DeviceProfile
                    active_profile.devices = Some(vec![DeviceProfile {
                        device_type: device.clone(),
                        settings: vec![device_trigger.clone()],
                    }]);
                }
            }
        }
    }

}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_profile_manager() {
        let mut profile_manager = ProfileManager::new();
        let expected_profile = Profile {
            id: Uuid::new_v4(),
            name: "Test".to_string(),
            devices: Some(vec![DeviceProfile {
                device_type: DeviceType::StreamDeckPlus,
                settings: vec![DeviceTrigger {
                    trigger_type: TriggerType::Button,
                    key_code: 0,
                    module: "Test".to_string(),
                    action: "Test".to_string(),
                    arguments: HashMap::new(),
                }],
            }]),
            created_at: Utc::now(),
        };

        profile_manager.add_profile(expected_profile.clone());

        let result_profile = profile_manager.get_profile("Test");

        assert!(result_profile.is_some());
    }

    #[test]
    fn test_profile_manager_from_json() {
        let json = r#"{"profiles":[{"name":"Test","devices":[{"device_type":"StreamDeckPlus","settings":[{"name":"Test","trigger_type":"Button","key_code":0,"module":"Test","action":"Test","arguments":{}}]}]}],"selected_profile":null}"#;
        let profile_manager = ProfileManager::from_json(json);

        assert!(profile_manager.profiles.is_some());
        assert_eq!(profile_manager.profiles.unwrap()[0].name, "Test");

        let json = r#"{
            "profiles": null,
            "selected_profile": null
        }"#;
        let profile_manager = ProfileManager::from_json(json);

        assert!(profile_manager.profiles.is_none());
        assert_eq!(profile_manager.selected_profile, None);
    }

    #[test]
    fn test_profile_manager_from_value() {
        let json = r#"{"profiles":[{"name":"Test","devices":[{"device_type":"StreamDeckPlus","settings":[{"name":"Test","trigger_type":"Button","key_code":0,"module":"Test","action":"Test","arguments":{}}]}]}],"selected_profile":null}"#;
        let value: serde_json::Value = serde_json::from_str(json).unwrap();
        let profile_manager = ProfileManager::from_value(value).unwrap();

        assert!(profile_manager.profiles.is_some());
        assert_eq!(profile_manager.profiles.unwrap()[0].name, "Test");

        let json = r#"{
            "profiles": null,
            "selected_profile": null
        }"#;
        let value: serde_json::Value = serde_json::from_str(json).unwrap();
        let profile_manager = ProfileManager::from_value(value).unwrap();

        assert!(profile_manager.profiles.is_none());
        assert_eq!(profile_manager.selected_profile, None);
    }
}
