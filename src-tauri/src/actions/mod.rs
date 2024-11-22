use crate::integrations::{Module, ModuleManager};
use tauri::command;

#[command]
pub fn get_modules() -> Vec<Module> {
  let module_manager = ModuleManager::new();
  module_manager.get_modules()
}
