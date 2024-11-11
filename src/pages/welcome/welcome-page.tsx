import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, FileDown, FileUp, PlusCircle } from "lucide-react"
import {AnimatePresence, motion} from 'framer-motion'
import {useProfileManager} from "@/hooks/commands/use-profile-manager.tsx";

export function WelcomePage() {

  const profileManager = useProfileManager();

  const [hoveredButton, setHoveredButton] = useState<string | null>(null)


  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-none shadow-2xl">
        <CardHeader className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-4xl font-bold text-white mb-2">Kadeck Controller</CardTitle>
            <CardDescription className="text-lg text-blue-200">Open Source Stream Controller for any hardware</CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 p-6">
          <AnimatePresence>
            <motion.div
                key={profileManager?.profiles.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold"
            >
              {profileManager?.profiles.length} {profileManager?.profiles.length === 1 ? 'Profile' : 'Profiles'}
            </motion.div>
          </AnimatePresence>

          <motion.div className="w-full space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              className="w-full h-14 text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
              onMouseEnter={() => setHoveredButton('new')}
              onMouseLeave={() => setHoveredButton(null)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <PlusCircle className={`mr-2 h-5 w-5 transition-all duration-200 ${hoveredButton === 'new' ? 'rotate-90' : ''}`} />
              New Profile
            </Button>
            <Button 
              className="w-full h-14 text-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
              disabled
            >
              <FileUp className="mr-2 h-5 w-5" />
              Load Profile
            </Button>
            <Button 
              className="w-full h-14 text-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
              disabled
            >
              <FileDown className="mr-2 h-5 w-5" />
              Export Profile
            </Button>
            <Button 
              className="w-full h-14 text-lg font-semibold bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-200"
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Github className={`mr-2 h-5 w-5 transition-all duration-200 ${hoveredButton === 'github' ? 'rotate-360' : ''}`} />
              Contribute on Github
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}