import { Logo } from "@/components/Logo";
import { DesktopNav } from "./DesktopNav";

export function DesktopHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      <Logo />
      <DesktopNav />
    </div>
  );
}