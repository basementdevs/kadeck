mod actions;

use kadeck_plugin_skeleton::{Module, ModuleAction, ModuleContract, ModuleSettings};
use std::collections::HashMap;

#[no_mangle]
pub extern "Rust" fn new_service() -> Box<dyn ModuleContract> {
    Box::new(ObsModule::new())
}


pub struct ObsModule {
    name: String,
}

impl ObsModule {
    pub fn new() -> ObsModule {
        ObsModule {
            name: "kadeck-obs".to_string(),
        }
    }
}

impl ModuleContract for ObsModule {
    fn get_module(&self) -> Module {
        Module {
            name: self.name.clone(),
            description: "Open Broadcaster Software".to_string(),
            enabled: false,
            settings: vec![
                ModuleSettings {
                    name: "address".to_string(),
                    r#type: "text".to_string(),
                    placeholder: "localhost".to_string(),
                    value: Some("localhost".to_string()),
                    order: 1,
                },
                ModuleSettings {
                    name: "port".to_string(),
                    r#type: "numeric".to_string(),
                    placeholder: "4554".to_string(),
                    value: None,
                    order: 1,
                },
            ],

            actions: vec![
                ModuleAction {
                    name: "start".to_string(),
                    description: "Start recording".to_string(),
                    settings: vec![],
                },
                ModuleAction {
                    name: "stop".to_string(),
                    description: "Stop recording".to_string(),
                    settings: vec![],
                },
                ModuleAction {
                    name: "pause".to_string(),
                    description: "Pause recording".to_string(),
                    settings: vec![],
                },
                ModuleAction {
                    name: "resume".to_string(),
                    description: "Resume recording".to_string(),
                    settings: vec![],
                },
            ],
        }
    }

    fn run_action(&self, action: &str, settings: HashMap<String, String>) -> usize {
        match action {
            "start" => actions::start(settings),
            "stop" => actions::start(settings),
            "pause" => panic!("Not implemented"),
            "resume" => panic!("Not implemented"),
            _ => panic!("Not implemented")
        }
    }
}

impl Drop for ObsModule {
    fn drop(&mut self) {
        println!("Dropping ObsModule");
    }
}