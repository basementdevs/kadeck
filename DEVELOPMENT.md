## Dev Notes

* **profiles:** configurations for the app which will reflect all devices
    * Profile 1: using streamdeck and streamdeck+
    * Profile 2: using streamdeck and streamdeck mini
    * Profile 3: using streamdeck xl only
* **actions:**  commands that will be called through the API
    * Get Available Modules
    * Set Module Configuration
* **workers:**  background tasks that will be listening for events from:
    * StreamDeck!!
    * OBS !!
* **integrations:** third party integrations for the app configuration
    * OBS
    * OS
    * Lighstrip
    * W/e

## Hooks Needed

* When Select which device: useFetchDevices
    * HID Devices from specific vendors
* Saving the Settings: useSaveProfile
    * POST to the API

## Flow

1. [StreamDeck Worker]
    1. Hardware button is pressed (Rust-StreamDeck)
    2. Event is sent to the StreamDeck Worker
    3. Worker Checks into the Profile Configuration
    4. Worker Checks into available Modules/Actions
    5. Worker Executes the action based on **PROFILE CONFIGURATION**
2. [Tauri App]
    1. [Setting new Functionality] // Wizard? Drag and Drop?
        1. User click in the trigger that wants to change
        2. Tauri fetch the trigger profile configuration tab
        3. Tauri fetch the available modules and actions
        4. User selects the action and switch to the configuration tab
            5. Fields are populated based on the action settings object
        5. User sets the configuration

## UI Draggable

Goal: bring an "Action" to some specific Key.

* Global Context for React DND
* Lock features per type (Button, Knob, Touch)
*

## Devices

```json
[
  {
    "name": "StreamDeck+",
    "type": "streamdeckplus",
    "keys": 8,
    "knobs": 4,
    "touch": 1
  }
]

```

## Profiles

```json
{
  "name": "Streaming Profile",
  "devices": [
    {
      "device_type": "StreamDeckPlus",
      "settings": [
        {
          "trigger_type": "Button",
          "key_code": 1,
          "module": "OBS",
          "action": "StartStreaming",
          "arguments": {}
        },
        {
          "trigger_type": "Knob",
          "key_code": 1,
          "module": "Spotify",
          "action": "Volume",
          "arguments": {}
        },
        {
          "trigger_type": "Button",
          "key_code": 2,
          "module": "OBS",
          "action": "ToggleSourceItem",
          "arguments": {
            "scene": "scene-uuid",
            "source": "camera-source-uuid"
          }
        }
      ]
    }
  ]
}

```

## Modules/Plugins Flow

All the plugins must be created following the `kadeck-plugin-skeleton interface` which at this first moment looks like:

```rust
pub trait ModuleContract {
    fn get_module(&self) -> Module;

    fn run_action(&self, action: &str, settings: HashMap<String, String>);
}
```

> This skeleton must be published as a 3rd party package.

### Module/Plugin Configuration

Inside the `ModuleAction` you can find an `Vec<ModuleSettings>` property which will holds all information you need to
build the settings page inside the application. You can think into something which will holds any metadata needed to
perform the module action. E.g:

```txt
Module: OBS
Settings:
* Address: string (ipv4/ipv6)
* Port: int
* Password: Option<String> 
```

This will be stored together with the user profile and should be sent to every request arg as `{module}_{settings}`.

Imagine that we have two different modules being `Twitch` and `OBS`:
```txt
obs_host: something
obs_port: something

twitch_access_key: some-key 
```

you would be able to use these informations inside the module actions: 
```rust
pub async fn toggle_stream(args: HashMap<String, String>) -> anyhow::Result<usize> {
    let host = args.get("obs_host").unwrap().clone();
    let port = args.get("obs_port").unwrap().clone().parse::<u16>().unwrap();
    let password = args.get("obs_password");

    let service = obws::Client::connect(host, port, password).await?;
    let service = service.streaming();

    let status = service.status().await?;

    match status.active {
        true => service.stop().await?,
        false => service.start().await?,
    }

    Ok(0)
}
```
