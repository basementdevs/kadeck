

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
   