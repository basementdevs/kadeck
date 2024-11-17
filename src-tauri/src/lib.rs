use crate::profiles::ProfileManager;
use serde_json::json;
use std::sync::{Arc, Mutex};
use tauri::{Manager, Wry};
use tauri_plugin_store::{Store, StoreExt};

mod actions;
mod integrations;
mod profiles;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[derive(Clone)]
struct AppState {
    last_used_by: String,
    queue: Vec<String>,
    pub profile_manager: Option<ProfileManager>,
    storage: Option<Arc<Store<Wry>>>
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_state = Arc::new(Mutex::new(AppState {
        last_used_by: "Tauri".to_string(),
        queue: vec!["Tauri".to_string()],
        profile_manager: None,
        storage: None
    }));

    // Tauri Agents: Logging, Store, Shell
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Stdout,
                ))
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .manage(app_state.clone())
        .setup({
            let app_state = Arc::clone(&app_state);
            move |app| {
                let store = app.store("kadeck-settings.json")?;
                {
                    let mut state = app_state.lock().unwrap();
                    state.storage = Some(store);
                }
                {
                    let mut state = app_state.lock().unwrap();
                    let store = state.storage.as_ref().unwrap();
                    // Initialize 'profiles' if not present
                    if !store.has("profiles") {
                        let new_profile_manager = ProfileManager::new();
                        store.set("profiles", json!(new_profile_manager));
                        store.save().expect("Failed to save profile manager");
                    }

                    // Retrieve and deserialize 'profiles'
                    let profiles_value = store.get("profiles").expect("fudeu buscando o corre");

                    let profile_manager =
                        ProfileManager::from_value(profiles_value).expect("fudeu no carregamento");
                    state.profile_manager = Some(profile_manager);

                }
                app.manage(app_state);

                Ok(())
            }
        })
        .invoke_handler(tauri::generate_handler![
            actions::get_modules,
            profiles::actions::get_profile_manager,
            profiles::actions::set_default_profile,
            profiles::actions::save_profile_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
