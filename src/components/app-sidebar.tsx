"use client"

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

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
          url: "./organization-setup",
        },
        {
          title: "Underwriting Setups",
          url: "./underwriting-setup",
        },
        {
          title: "Finance Setups",
          url: "./finance-setup",
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
          url: "./prospects",
        },
        {
          title: "New Quote",
          url: "./new-quote",
        },
        {
          title: "Medical Quote",
          url: "./medical-quote",
        },
        {
          title: "Quote Enquiry",
          url: "./quote-enquiry",
        },
        {
          title: "Convert Quotes",
          url: "./convert",
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
          url: "./insurers",
        },
        {
          title: "Clients",
          url: "./clients",
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
          url: "./lapse-policy",
        },
        {
          title: "Policy Enquiry",
          url: "./policy-enquiry",
        },
        {
          title: "Pending Transactions",
          url: "./pending-trans",
        },
        {
          title: "Renewals",
          url: "./renewals",
        },
        {
          title: "Refunds",
          url: "./refunds",
        },
        {
          title: "Transactions Reconcilliation",
          url: "./trans-recon",
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
      url: "./settings",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "./support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "./feedback",
      icon: Send,
    },
  ],
};

// ---NAV COMPONENTS ---
function NavMain({ items }: { items: typeof data.navMain }) {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({ ...prev, [title]: !prev[title] }));
  };

  if (!mounted) {
    return (
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          {item.items ? (
            <Collapsible 
              open={openItems[item.title]} 
              onOpenChange={() => toggleItem(item.title)}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton suppressHydrationWarning>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                  {openItems[item.title] ? (
                    <ChevronDown className="ml-auto size-4" />
                  ) : (
                    <ChevronRight className="ml-auto size-4" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent suppressHydrationWarning>
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
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function NavSecondary({ 
  items, 
  className 
}: { 
  items: typeof data.navSecondary; 
  className?: string;
}) {
  return (
    <SidebarMenu className={className}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} suppressHydrationWarning>
      <SidebarHeader>
        <SidebarMenu>
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
  );
}