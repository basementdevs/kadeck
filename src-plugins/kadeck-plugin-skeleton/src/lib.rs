use std::collections::HashMap;
use std::future::Future;

#[derive(Debug, Clone)]
pub struct ModuleSettings {
    pub name: String,
    pub r#type: String,
    pub placeholder: String,
    pub value: Option<String>,
    pub order: i32,
}
#[derive(Debug, Clone)]
pub struct ModuleAction {
    pub name: String,
    // toggleable? (start/stop) or not (clickable)
    pub description: String,
    pub settings: Vec<ModuleSettings>,
}

#[derive(Debug, Clone)]
pub struct Module {
    pub name: String,
    pub description: String,
    pub enabled: bool,
    pub settings: Vec<ModuleSettings>,
    pub actions: Vec<ModuleAction>,
}

pub trait ModuleContract {
    fn get_module(&self) -> Module;

    fn run_action(&self, action: &str, settings: HashMap<String, String>);
}
