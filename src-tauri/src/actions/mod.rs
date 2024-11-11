use crate::integrations::{Module, ModuleManager};
use crate::profiles::ProfileManager;
use crate::AppState;
use std::sync::{Arc, Mutex};
use log::info;
use tauri::{command, State, Wry};
use tauri_plugin_store::{Store, StoreBuilder, StoreExt};
use uuid::Uuid;

#[command]
pub fn get_modules() -> Vec<Module> {
    let module_manager = ModuleManager::new();
    module_manager.get_modules()
}

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