"use client"

import * as React from "react"
import Link from 'next/link';
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
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { title } from "process"

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
      title: "Customer",
      url: "./customer",
      icon: BookOpen,
    },
    {
      title: "Policy Management",
      url: "./policy-management",
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
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" className="text-white ">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg border border-amber-50">
                  <Command className="size-4 " />
            
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-semibold">Bancassurance</span>
                  <span className="truncate text-xs">Insurance</span>
                </div>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
