import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { DesktopNav } from "./DesktopNav";

export function MobileHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-2 border-b bg-background p-4 lg:flex lg:hidden">
      <SidebarTrigger>
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
      <Logo />
    </div>
  );
}

export function DesktopHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 hidden h-16 items-center justify-between border-b bg-background px-6 lg:flex">
      <Logo />
      <DesktopNav />
    </div>
  );
}