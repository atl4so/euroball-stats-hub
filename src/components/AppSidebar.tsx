import { Sidebar } from "@/components/ui/sidebar";
import { MobileNav } from "./navigation/MobileNav";
import { MobileHeader, DesktopHeader } from "./navigation/Headers";

export function AppSidebar() {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
      <Sidebar className="z-50 lg:hidden" collapsible="offcanvas">
        <MobileNav />
      </Sidebar>
    </>
  );
}