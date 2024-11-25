import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { useProfileManager } from '@/hooks/commands/use-profile-manager.tsx';
import { invoke } from '@tauri-apps/api/core';
import { motion } from 'framer-motion';
import { FileDown, FolderOpen, Gamepad2, Github, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function WelcomePage() {
  const { profileManager, fetchProfiles } = useProfileManager();

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const changeDefaultProfile = (profileId: string) => {
    // @ts-ignore
    invoke('set_default_profile', { profileId: profileId })
      .then(() => {
        console.log('Profile changed');
        fetchProfiles();
      })
      .catch((e) => {
        toast.error(`Error changing profile ${e}`);
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <Card className='w-full max-w-xl bg-white/10 backdrop-blur-md border-none shadow-2xl'>
        <CardHeader className='text-center'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className='text-4xl font-bold text-white mb-2'>Kadeck Controller</CardTitle>
            <CardDescription className='text-lg text-blue-200'>
              Open Source Stream Controller for any hardware
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className='flex flex-col items-center space-y-4 p-6'>
          <motion.div
            className='w-full space-y-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              className='w-full h-14 text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg'
              onMouseEnter={() => setHoveredButton('new')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <PlusCircle
                className={`mr-2 h-5 w-5 transition-all duration-200 ${
                  hoveredButton === 'new' ? 'rotate-90' : ''
                }`}
              />
              New Profile
            </Button>
            <Card className='bg-gray-800/50 border-none shadow-inner'>
              <CardHeader>
                <CardTitle className='text-white text-center text-xl'>
                  Load Profile ({profileManager.profiles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea
                  className={`w-full pr-4 ${
                    profileManager.profiles.length === 0 ? 'h-0' : 'h-[250px]'
                  }`}
                >
                  {profileManager.profiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      onClick={() => changeDefaultProfile(profile.id)}
                      className='flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg mb-2 transition-colors duration-200'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`flex flex-col rounded px-2 ${
                          profile.id === profileManager.selected_profile
                            ? 'border-blue-500 border-l-4 '
                            : ''
                        } `}
                      >
                        <span className='font-semibold text-white'>{profile.name}</span>
                        <span className='text-sm text-gray-400'>
                          Created: {profile.created_at.toDateString()}
                        </span>
                      </div>
                      <div className='flex gap-2 '>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-green-400 w-[50px] hover:text-green-300 hover:bg-green-400/20'
                        >
                          <Gamepad2 className='h-5 w-5' />
                          {profile.devices?.length || 0}
                          <span className='sr-only'>Devices Listed</span>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-blue-400 hover:text-blue-300 hover:bg-blue-400/20'
                        >
                          <FolderOpen className='h-5 w-5' />
                          <span className='sr-only'>Open profile</span>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-red-400 hover:text-red-300 hover:bg-red-400/20'
                        >
                          <Trash2 className='h-5 w-5' />
                          <span className='sr-only'>Delete profile</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Button className='w-full h-14 text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg'>
              <FileDown className='mr-2 h-5 w-5' />
              Export Profile
            </Button>
            <Button
              className='w-full h-14 text-lg font-semibold bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-200'
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Github
                className={`mr-2 h-5 w-5 transition-all duration-200 ${
                  hoveredButton === 'github' ? 'rotate-360' : ''
                }`}
              />
              Contribute on Github
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
