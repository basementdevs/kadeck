import { useState, useEffect } from 'react';
import {invoke} from "@tauri-apps/api/core";


export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);


    useEffect(() => {
        invoke<T>(command, args)
            .then((result) => {
                setData(result);
                setError(null);
            })
            .catch((err) => {
                setError(err);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [command, args]);

    return { data, error, loading };
}






