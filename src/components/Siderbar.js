"use client";

import React from "react";
import {
  CalendarIcon,
  ChevronsLeft,
  ChevronsRight,
  FolderIcon,
  HomeIcon,
  Settings,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo.png";
import smallLogo from "../../public/small-logo.png";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "#", icon: '', current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", icon: FolderIcon, current: false },
  { id: 2, name: "Tailwind Labs", href: "#", icon: FolderIcon, current: false },
  { id: 3, name: "Workcation", href: "#", icon: FolderIcon, current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  return (
    <>
      {/* Mobile Sidebar */}
      <div></div>
      {/* Desktop sidebar */}
      <div
        className={`${
          !sidebarOpen ? "w-fit" : "w-[300px]"
        } h-screen sticky left-0 top-0 p-6 flex flex-col bg-white border-r`}
      >
        {/* Logo */}

        <Image
          src={sidebarOpen ? logo : smallLogo}
          alt="logo"
          className={`${!sidebarOpen ? "w-5 mb-5" : "w-28"} h-auto`}
        />
        {/* Collapse Arrow */}
        <div
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          className={`absolute cursor-pointer group top-6 -right-3 text-primary-900 p-1 bg-slate-50 hover:text-primary-950 rounded ${
            !sidebarOpen && "top-7 p-0"
          }`}
        >
          {sidebarOpen ? (
            <ChevronsLeft className="size-5 stroke-dark-300 group-hover:stroke-dark-200" />
          ) : (
            <ChevronsRight className="size-5 stroke-dark-300 group-hover:stroke-dark-200" />
          )}
        </div>
        <div>
          {/* Admin Menu */}
          <div
            className={`${
              !sidebarOpen && "hidden"
            } mt-6 mb-2 text-xs font-semibold leading-6 uppercase text-gray-400`}
          >
            Main Menu
          </div>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-50 text-slate-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-slate-600",
                    "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.current
                        ? "text-slate-600"
                        : "text-gray-500 group-hover:text-slate-600",
                      !sidebarOpen ? "size-5" : "size-4",
                      "shrink-0"
                    )}
                  />
                  {!sidebarOpen || item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Team Menu */}
          <div className={`${!sidebarOpen ? "mt-4 mb-1" : "mt-6 mb-2"}`}>
            {!sidebarOpen ? (
              <div aria-hidden="true" className="h-[1px] bg-border w-full" />
            ) : (
              <div className="text-xs font-semibold uppercase leading-6 text-gray-400">
                Your teams
              </div>
            )}
          </div>
          {/* Team Menu Item */}
          <ul role="list" className="-mx-2 space-y-1">
            {teams.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-50 text-slate-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-slate-600",
                    "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.current
                        ? "text-slate-600"
                        : "text-gray-500 group-hover:text-slate-600",
                      !sidebarOpen ? "size-5" : "size-4",
                      "shrink-0"
                    )}
                  />
                  {!sidebarOpen || item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto text-sm">
          <div
            className={classNames(
              "text-gray-500 hover:bg-gray-50 hover:text-slate-600",
              "group flex items-center gap-x-3 rounded-md text-sm font-semibold leading-6"
            )}
          >
            <Settings className="size-4 stroke-slate-500" />
            {!sidebarOpen || "Settings"}
          </div>
        </div>
      </div>
    </>
  );
}
