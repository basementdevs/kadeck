import type { ProfileManager } from '@/vite-env';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';

const useProfileManager = () => {
  const [profileManager, setProfileManager] = useState<ProfileManager>({
    profiles: [],
    selected_profile: null,
  } as ProfileManager);

  const fetchProfiles = () => {
    invoke('get_profile_manager').then((result: ProfileManager | unknown) => {
      // @ts-ignore
      result.profiles = result.profiles.map((profile: any) => {
        profile.created_at = new Date(profile.created_at);
        return profile;
      });
      setProfileManager(result as ProfileManager);
    });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return { profileManager, fetchProfiles };
};

export { useProfileManager };
