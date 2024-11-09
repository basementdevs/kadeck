use tauri::command;
use crate::integrations::{Module, ModuleManager};

#[command]
pub fn get_modules() -> Vec<Module>  {
    let module_manager = ModuleManager::new();

    module_manager.get_modules()

}
