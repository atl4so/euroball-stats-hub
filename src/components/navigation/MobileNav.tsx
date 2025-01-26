import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "./navigationItems";

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => (
        <Link
          key={item.title}
          to={item.url}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            location.pathname === item.url
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}