import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Dropdown({
  item,
  className,
  sidebarOpen,
  dropdownClassName,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  return (
    <>
      <Link
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        href={item.href}
        className={cn(
          item.current
            ? "bg-gray-50 text-slate-600"
            : "text-gray-500 hover:bg-gray-50 hover:text-slate-600",
          "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6"
        )}
      >
        <item.icon
          aria-hidden="true"
          className={cn(
            item.current
              ? "text-slate-600"
              : "text-gray-500 group-hover:text-slate-600",
            !sidebarOpen ? "size-4" : "size-4",
            "shrink-0 flex items-center",
            className
          )}
        />
        {!sidebarOpen || item.name}
        {!isDropdownOpen && item?.dropdown && (
          <ChevronDown className="size-4 stroke-slate-500" />
        )}
        {isDropdownOpen && item?.dropdown && (
          <ChevronUp className="size-4 stroke-slate-500" />
        )}
      </Link>
      {/* Dropdown item */}
      {isDropdownOpen &&
        item.dropdown.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              item.current
                ? "bg-gray-50 text-slate-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-slate-600",
              "group gap-x-3 rounded-md pl-10 pr-3 py-2 text-sm font-semibold leading-6"
            )}
          >
            {!sidebarOpen || item.name}
          </Link>
        ))}
    </>
  );
}
