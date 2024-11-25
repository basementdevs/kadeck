use crate::integrations::{Module, ModuleAction, ModuleContract};

pub struct ObsModule {
  name: String,
}

impl ObsModule {
  pub fn new() -> ObsModule {
    ObsModule {
      name: "obs".to_string(),
    }
  }
}

impl ModuleContract for ObsModule {
  fn get_module(&self) -> Module {
    Module {
      name: self.name.clone(),
      description: "Open Broadcaster Software".to_string(),
      enabled: false,
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
}
