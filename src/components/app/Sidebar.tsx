import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {ChevronDown, LucideGithub, Menu, Mic, Music, Settings, Tag, Video} from "lucide-react";
import {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import SidebarDraggableItem from "@/components/app/sidebar-draggable-item.tsx";

export function AppSidebar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortMethod, setSortMethod] = useState('alphabetical')

    const tabs = [
        {
            title: 'Logic',
            icon: <Tag className="w-5 h-5"/>,
            items: [
                {name: 'If', icon: <ChevronDown className="w-4 h-4"/>},
                {name: 'Else', icon: <ChevronDown className="w-4 h-4"/>}
            ],
            opened: true,
            installed_at: new Date('2023-01-01')
        },
        {
            title: 'Navigation',
            icon: <Menu className="w-5 h-5"/>,
            items: [
                {name: 'Folder', icon: <Menu className="w-4 h-4"/>},
                {name: 'Previous Page', icon: <ChevronDown className="w-4 h-4"/>},
                {name: 'Next Page', icon: <ChevronDown className="w-4 h-4"/>},
                {name: 'Change Profile', icon: <ChevronDown className="w-4 h-4"/>}
            ],
            opened: true,
            installed_at: new Date('2023-02-15')
        },
        {
            title: 'Spotify',
            icon: <Music className="w-5 h-5"/>,
            items: [],
            opened: true,
            installed_at: new Date('2023-03-10')
        },
        {
            title: 'OBS Studio',
            icon: <Video className="w-5 h-5"/>,
            items: [
                {
                    name: 'Stream', icon: <Video className="w-4 h-4"/>
                },
                {name: 'Record', icon: <Video className="w-4 h-4"/>},
                {name: 'Scene', icon: <Video className="w-4 h-4"/>},
                {name: 'Source', icon: <Video className="w-4 h-4"/>},
                {name: 'Audio Mixer', icon: <Mic className="w-4 h-4"/>},
                {name: 'Filter', icon: <Settings className="w-4 h-4"/>}
            ],
            opened: true,
            installed_at: new Date('2023-04-20')
        }
    ]

    const filteredTabs = tabs
        .filter(tab =>
            tab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tab.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortMethod === 'alphabetical') {
                return a.title.localeCompare(b.title)
            } else if (sortMethod === 'install_date') {
                return b.installed_at.getTime() - a.installed_at.getTime()
            } else {
                return tabs.indexOf(b) - tabs.indexOf(a)
            }
        })

    return (
        <Sidebar>
            <SidebarHeader className="bg-gray-800">
                <h1 className="text-white">Kadeck foda</h1>
            </SidebarHeader>
            <SidebarContent className="bg-gray-800">
                <p className={"px-3 text-white"}>Modules</p>
                {filteredTabs.map((tab, index) => (
                    <Collapsible defaultOpen={tab.opened} className="group/collapsible">
                        <SidebarGroup key={index}>
                            <SidebarGroupLabel asChild className="text-white">
                                <CollapsibleTrigger>
                                    {tab.title}
                                    <ChevronDown
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {tab.items.map((item, itemIndex) => (
                                            <SidebarDraggableItem item={item}
                                                                  key={"sidebar-item-" + tab.title + "-" + itemIndex}
                                                                  idx={itemIndex}>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton>
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
            <SidebarFooter className="bg-gray-900 text-white p-4 text-center flex justify-between flex-row">
                <span>2024 © Kadeck</span>
                <a href={"https://github.com/basementdevs"}> <LucideGithub/></a>

            </SidebarFooter>
        </Sidebar>
    )
}