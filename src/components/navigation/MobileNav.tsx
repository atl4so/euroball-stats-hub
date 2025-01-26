import { Link, useLocation } from "react-router-dom";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { navigationItems } from "./navigationItems";

export function MobileNav() {
  const location = useLocation();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full",
                    location.pathname === item.url && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link to={item.url} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}