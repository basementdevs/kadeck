import type { DeviceTrigger } from '@/vite-env';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useSaveProfileSettings = () => {
  const [deviceSettings, setProfileManager] = useState<DeviceTrigger>();

  const saveSettings = () => {
    invoke('save_profile_settings', { payload: deviceSettings })
      .then((_) => {
        toast.success('Saved');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    saveSettings();
  }, [setProfileManager]);

  return { setProfileManager, saveSettings };
};

export { useSaveProfileSettings };
