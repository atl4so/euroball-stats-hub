import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => {
  return (
    <nav className="flex px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
      <Link to="/" className="hover:text-primary">Home</Link>
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <span className="mx-2">{">"}</span>
          <Link
            to={item.path}
            className={`hover:text-primary ${
              index === items.length - 1 ? "text-primary font-medium" : ""
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};
