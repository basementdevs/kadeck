use std::collections::HashMap;
use kadeck_plugin_skeleton::ModuleContract;

fn main() {
    let lib = unsafe { libloading::Library::new("target/debug/libkadeck_obs.so") }
        .expect("load library");
    let new_service: libloading::Symbol<extern "Rust" fn() -> Box<dyn ModuleContract>> = unsafe { lib.get(b"new_service") }
        .expect("load symbol");
    let service = new_service();

    let mut settings: HashMap<String, String> = std::collections::HashMap::new();

    settings.insert("scene".to_string(), "main".to_string());

    println!("{:?}", service.run_action("start", settings));
}
