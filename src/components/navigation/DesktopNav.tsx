import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navigationItems } from "./navigationItems";

export function DesktopNav() {
  const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link to={item.url}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  location.pathname === item.url && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}