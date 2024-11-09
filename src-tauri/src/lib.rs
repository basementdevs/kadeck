use std::sync::Mutex;
use tauri::Manager;
use tauri_plugin_store::StoreExt;

mod actions;
mod integrations;
mod profiles;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/


#[derive(Debug, Clone)]
struct AppState {
    last_used_by: String,
    queue: Vec<String>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    let mut app_state = Mutex::new(AppState {
        last_used_by: "Tauri".to_string(),
        queue: vec!["Tauri".to_string()],
    });

    // OBS Agent: +1 thread
    // W/E Agent +n threads

    // Tauri Agent : ok
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let store = app.store("settings.json")?;

            app.manage(app_state);

            store.close_resource();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![actions::get_modules])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
