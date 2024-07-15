import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Dropdown({
  item,
  className,
  sidebarOpen,
  dropdownClassName,
  pathName,
  user,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  return (
    <>
      <Link
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        href={item.href}
        className={cn(
          item.href == pathName
            ? "bg-primary-50 text-slate-600"
            : "text-gray-500 hover:bg-primary-50 hover:text-slate-600",
          "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6"
        )}
      >
        <item.icon
          aria-hidden="true"
          className={cn(
            item.href == pathName
              ? "text-slate-600"
              : "text-gray-500 group-hover:text-slate-600",
            !sidebarOpen ? "size-5" : "size-5",
            "shrink-0 flex items-center",
            className
          )}
        />
        <div className="flex-1 flex items-center">
          {!sidebarOpen || <span>{item.name}</span>}
          <div className="ml-auto">
            {!isDropdownOpen && item?.dropdown && (
              <ChevronDown className="size-4 stroke-slate-500" />
            )}
            {isDropdownOpen && item?.dropdown && (
              <ChevronUp className="size-4 stroke-slate-500" />
            )}
          </div>
        </div>
      </Link>
      {/* Dropdown item */}
      {isDropdownOpen &&
        item.dropdown.map(
          (item, index) =>
            (item.accessStore == "default" ||
              item.accessStore == user.storeType) &&
            (item.accessRole == "default" || item.accessRole == user.role) && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  item.href == pathName
                    ? "bg-primary-50 text-slate-600"
                    : "text-gray-500 hover:bg-primary-50 hover:text-slate-600",
                  "group gap-x-3 block mt-1 rounded-md pl-12 pr-3 py-2 text-sm font-semibold leading-6"
                )}
              >
                {!sidebarOpen || item.name}
              </Link>
            )
        )}
    </>
  );
}
