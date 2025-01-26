import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { MobileHeader } from "./navigation/Headers";
import { MobileNav } from "./navigation/MobileNav";

export function AppSidebar() {
  return (
    <Sidebar className="lg:hidden">
      <MobileHeader />
      <SidebarContent>
        <MobileNav />
      </SidebarContent>
    </Sidebar>
  );
}