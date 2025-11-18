"use client"

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

const data = {
  user: {
    name: "Superadmin",
    email: "superadmin@bancassurance.com",
    avatar: "/profile-img.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "./dashboard",
      icon: BookOpen,
    },

    {
      title: "Set ups",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Organization Setups",
          url: "#",
        },
        {
          title: "Underwriting Setups",
          url: "#",
        },
        {
          title: "Finance Setups",
          url: "#",
        },
      ],
    },
    {
      title: "User Administration",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users and Roles",
          url: "#",
        },
        {
          title: "Roles and Permissions",
          url: "#",
        },
        {
          title: "Permissions",
          url: "#",
        },
      ],
    },
    {
      title: "Quotes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Prospects",
          url: "#",
        },
        {
          title: "New Quote",
          url: "#",
        },
        {
          title: "Medical Quote",
          url: "#",
        },
        {
          title: "Quote Enquiry",
          url: "#",
        },
        {
          title: "Convert Quotes",
          url: "#",

        },
      ],
    },   
    {
      title: "Claims",
      url: "./claims",
      icon: BookOpen,
    },
    {
      title: "Policy Management",
      url: "./policy-management",
      icon: BookOpen,
    },
    {
      title: "Underwriters & Clients",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Insurers/Sub Agents",
          url: "#",
        },
        {
          title: "Clients",
          url: "#",
        },
      ],
    },
    {
      title: "Transactions Module",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Lapse Policies",
          url: "#",
        },
        {
          title: "Policy Enquiry",
          url: "#",
        },
        {
          title: "Pending Trans",
          url: "#",
        },
        {
          title: "Renewals",
          url: "#",
        },
        {
          title: "Refunds",
          url: "#",
        },
        {
          title: "Transactions Reconcilliation",
          url: "#",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "./reports",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "./settings",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],

}

// ---NAV COMPONENTS ---
function NavMain({ items}: {items: typeof data.navMain}) {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          {item.items ? (
            <Collapsible open={openItems[item.title]} onOpenChange={() => toggleItem(item.title)}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <item.icon className="size-4"/>
                  <span>{item.title}</span>
                  {openItems[item.title] ? <ChevronDown className="ml-auto size-4"/> : <ChevronRight className="ml-auto size-4"/>}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={sub.url}>
                          <span>{sub.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon className="size-4"/>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function NavSecondary({items, className}: {items: typeof data.navSecondary, className?: string}) {
  return (
    <SidebarMenu className={className}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <item.icon className="size-4"/>
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
            
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-semibold">Bancassurance</span>
                  <span className="truncate text-xs">Insurance</span>
                </div>
              </Link>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user}/>
      </SidebarFooter>
    </Sidebar>
  )
}
