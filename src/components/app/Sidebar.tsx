import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {
  Apple,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code,
  LucideGithub,
  Menu,
  Mic,
  Music,
  Settings,
  Tag,
  Video,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import SidebarDraggableItem from "@/components/app/sidebar-draggable-item.tsx";

const tabs = [
  {
    title: "Logic",
    icon: <Tag className="w-5 h-5" />,
    items: [
      { name: "If", icon: <Code className="w-4 h-4" /> },
      { name: "Else", icon: <Code className="w-4 h-4" /> },
    ],
    opened: true,
    installed_at: new Date("2023-01-01"),
  },
  {
    title: "Navigation",
    icon: <Menu className="w-5 h-5" />,
    items: [
      { name: "Folder", icon: <Menu className="w-4 h-4" /> },
      { name: "Previous Page", icon: <Code className="w-4 h-4" /> },
      { name: "Next Page", icon: <Code className="w-4 h-4" /> },
      { name: "Change Profile", icon: <Code className="w-4 h-4" /> },
    ],
    opened: true,
    installed_at: new Date("2023-02-15"),
  },
  {
    title: "Spotify",
    icon: <Music className="w-5 h-5" />,
    items: [],
    opened: true,
    installed_at: new Date("2023-03-10"),
  },
  {
    title: "OBS Studio",
    icon: <Video className="w-5 h-5" />,
    items: [
      {
        name: "Stream",
        icon: <Video className="w-4 h-4" />,
      },
      { name: "Record", icon: <Video className="w-4 h-4" /> },
      { name: "Scene", icon: <Video className="w-4 h-4" /> },
      { name: "Source", icon: <Video className="w-4 h-4" /> },
      { name: "Audio Mixer", icon: <Mic className="w-4 h-4" /> },
      { name: "Filter", icon: <Settings className="w-4 h-4" /> },
    ],
    opened: true,
    installed_at: new Date("2023-04-20"),
  },
];

export function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMethod, setSortMethod] = useState("alphabetical");

  const filteredTabs = tabs
    .filter(
      (tab) =>
        tab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tab.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortMethod === "alphabetical") {
        return a.title.localeCompare(b.title);
      } else if (sortMethod === "install_date") {
        return b.installed_at.getTime() - a.installed_at.getTime();
      } else {
        return tabs.indexOf(b) - tabs.indexOf(a);
      }
    });

  return (
    <Sidebar className=" px-3 py-3 bg-gray-800">
      <SidebarHeader className="bg-gray-800">
        <h1 className="text-white">Kadeck foda</h1>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800 pt-5">
        <p className=" px-3 text-gray-400">Modules</p>
        {filteredTabs.map((tab, index) => (
          <Collapsible defaultOpen={tab.opened} className="group/collapsible">
            <SidebarGroup key={index}>
              <SidebarGroupLabel
                asChild
                className="text-white bg-gray-800 hover:bg-gray-600 transition-colors rounded-xl p-3"
              >
                <CollapsibleTrigger className="">
                  {tab.title}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="pt-2">
                    {tab.items.map((item, itemIndex) => (
                      <SidebarDraggableItem
                        item={item}
                        key={"sidebar-item-" + tab.title + "-" + itemIndex}
                        idx={itemIndex}
                      >
                        <SidebarMenuItem>
                          <SidebarMenuButton className="bg-gray-800 hover:text-white hover:bg-gray-600 transition-colors rounded-xl p-3">
                            {item.icon}
                            <span className="flex items-center">
                              <span className="ml-2"> {item.name} </span>
                            </span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarDraggableItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-gray-800 text-white p-4 text-center flex justify-between flex-row text-sm items-center">
        <span>2024 © Kadeck</span>
        <a href={"https://github.com/basementdevs"}>
          {" "}
          <LucideGithub />
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
