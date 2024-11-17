import {useState, useEffect} from 'react';
import {invoke} from "@tauri-apps/api/core";
import {DeviceTrigger} from "@/vite-env";


const useSaveProfileSettings = () => {
    const [deviceSettings, setProfileManager] = useState<DeviceTrigger>();

    const saveSettings = () => {
        invoke("save_profile_settings", {payload: deviceSettings})
            .then((_) => {
                alert('saved')
            })
            .catch((error) => {
                alert(error)
            });
    }

    useEffect(() => {
        saveSettings();
    }, [setProfileManager]);

    return {setProfileManager, saveSettings};
}

export {useSaveProfileSettings};