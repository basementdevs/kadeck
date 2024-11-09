
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app/Sidebar.tsx";
import React from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider className="bg-gray-800">
      <div className="flex h-screen bg-gray-900 text-gray-300">
        <AppSidebar/>
        {children}
      </div>
    </SidebarProvider>
  )
}