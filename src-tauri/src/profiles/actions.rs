use std::sync::{Arc, Mutex};
use log::info;
use tauri::{command, State, Wry};
use tauri_plugin_store::StoreExt;
use uuid::Uuid;
use crate::AppState;
use crate::profiles::{DeviceTrigger, DeviceType, ProfileManager};

#[command]
pub fn get_profile_manager(state: State<'_, Arc<Mutex<AppState>>>) -> ProfileManager {
    let app_state = state.lock().unwrap();
    let profile_manager = app_state.profile_manager.clone().unwrap();
    info!("Profile Manager call{:?}", profile_manager.selected_profile);
    profile_manager
}

#[command]
pub async fn set_default_profile(
    window: tauri::Window<Wry>,
    state: State<'_, Arc<Mutex<AppState>>>,
    profile_id: &str
) -> Result<String, String> {
    let mut app_state = state.lock().unwrap();
    info!("Setting default profile to: {}", profile_id);

    let profile_id = Uuid::parse_str(profile_id).unwrap();

    let profile_manager = app_state.profile_manager.clone().unwrap();
    if let Some(profile) = profile_manager.find_profile(&profile_id) {
        info!("Setting default profile to: {}", profile.name);
        app_state.profile_manager.as_mut().unwrap().selected_profile = Some(profile_id);
        let store = window.store("kadeck-settings.json").unwrap();
        store.set("profiles", serde_json::to_value(&profile_manager).unwrap());
        store.save().expect("Failed to save profile manager");
        store.close_resource()
    } else {
        info!("Profile not found: {}", profile_id);
        return Err("Profile not found".to_string())
    }

    Ok("Profile set".to_string())
}

#[command]
pub async fn save_profile_settings(
    window: tauri::Window<Wry>,
    state: State<'_, Arc<Mutex<AppState>>>,
    device: &str,
    payload: DeviceTrigger
) -> Result<String, String> {
    let mut app_state = state.lock().unwrap();
    let mut profile_manager = app_state.profile_manager.clone().unwrap();
    info!("Saving profile settings for: {:?}", payload);
    info!("Saving profile settings for: {:?}", device);

    let device = DeviceType::from_str(device).unwrap();
    profile_manager.update_active_profile_settings(device, payload);
    app_state.profile_manager = Some(profile_manager.clone());

    let store = window.store("kadeck-settings.json").unwrap();
    store.set("profiles", serde_json::to_value(&profile_manager).unwrap());
    store.save().expect("Failed to save profile manager");
    store.close_resource();

    Ok("Profile settings saved".to_string())
}