import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import PlayerDetails from "@/pages/PlayerDetails";
import Standings from "@/pages/Standings";
import Teams from "@/pages/Teams";
import TeamDetails from "@/pages/TeamDetails";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const queryClient = new QueryClient();

const navigationItems = [
  {
    title: "Games",
    path: "/",
    description: "View all games and results"
  },
  {
    title: "Teams",
    path: "/teams",
    description: "Browse all teams"
  },
  {
    title: "Standings",
    path: "/standings",
    description: "Check current standings"
  }
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col">
          {/* Desktop Navigation */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList>
                    {navigationItems.map((item) => (
                      <NavigationMenuItem key={item.path}>
                        <NavigationMenuLink
                          asChild
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          )}
                        >
                          <Link to={item.path}>{item.title}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                {isMobileMenuOpen && (
                  <div className="absolute top-full left-0 w-full bg-background border-b">
                    <nav className="container py-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game/:gameCode" element={<GameDetails />} />
              <Route path="/player/:playerCode" element={<PlayerDetails />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/team/:teamCode" element={<TeamDetails />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;