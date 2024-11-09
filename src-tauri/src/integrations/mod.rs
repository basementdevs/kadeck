mod modules;

use crate::integrations::modules::obs::ObsModule;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
struct ModuleSettings {
    name: String,
    r#type: String,
    placeholder: String,
    value: String,
    order: i32,
}
#[derive(Debug, Clone, Serialize)]
struct ModuleAction {
    name: String,
    description: String,
    settings: Vec<ModuleSettings>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Module {
    name: String,
    description: String,
    enabled: bool,
    actions: Vec<ModuleAction>,
}

trait ModuleContract {
    fn get_module(&self) -> Module;
}
#[derive(Debug, Clone)]
pub struct ModuleManager {
    modules: Vec<Module>,
}

impl ModuleManager {
    pub fn new() -> ModuleManager {
        ModuleManager {
            modules: vec![ObsModule::new().get_module()],
        }
    }

    fn add_module(&mut self, module: Module) {
        self.modules.push(module);
    }

    pub fn get_modules(&self) -> Vec<Module> {
        self.modules.clone()
    }
}
