"use client";

import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ClipboardListIcon,
  Cog,
  Earth,
  HomeIcon,
  School,
  TriangleAlert,
  User,
  UsersIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.png";
import smallLogo from "../../public/small-logo.png";
import Dropdown from "./Dropdown";

const navigation = [
  {
    name: "Dashboard",
    accessStore: "default",
    accessRole: "default",
    href: "/dashboard",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "Members",
    accessStore: "default",
    accessRole: "default",
    href: "/members",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Course",
    accessStore: "academic",
    accessRole: "default",
    href: "/course",
    icon: School,
    current: false,
  },
  {
    name: "Training",
    accessStore: "club",
    accessRole: "default",
    href: "/training",
    icon: Earth,
    current: false,
  },
  {
    name: "Rules",
    accessStore: "default",
    accessRole: "default",
    href: "/rules",
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: "Notice",
    accessStore: "default",
    accessRole: "default",
    href: "/notice",
    icon: TriangleAlert,
    current: false,
  },
  {
    name: "Store Settings",
    accessStore: "default",
    accessRole: "default",
    href: "/store-settings",
    icon: Cog,
    current: false,
  },
  // { name: "Documents", href: "#", icon: '', current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  isProfileMenuOpen,
  setIsProfileMenuOpen,
}) {
  const pathName = usePathname();
  const user = {
    name: "Mokhlesur Rahman",
    email: "mokhles.xponent@gmail.com",
    role: "admin",
    storeType: "club",
  };
  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`${!mobileSidebarOpen ? "hidden" : "block"} lg:hidden`}>
        {/* Overlay  */}
        <div className={"fixed inset-0 bg-slate-950 opacity-60"}></div>
        <div className={`fixed inset-0 max-w-[300px] bg-white flex`}>
          <div className="flex flex-col p-4 relative min-w-[300px]">
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute right-2 top-2 cursor-pointer px-3 py-2"
            >
              <X className="size-4 stroke-slate-500" />
            </div>
            <Image src={smallLogo} alt="logo" className="h-8 w-fit" />
            <div className="mt-4">
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.dropdown ? (
                      <Link
                        href={item.href}
                        className={classNames(
                          item.href == pathName
                            ? "bg-primary-50 text-slate-600"
                            : "text-gray-500 hover:bg-primary-50 hover:text-slate-600",
                          "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.href == pathName
                              ? "text-slate-600"
                              : "text-gray-500 group-hover:text-slate-600",
                            "size-4",
                            "shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    ) : (
                      <Dropdown
                        item={item}
                        sidebarOpen={sidebarOpen}
                        pathName={pathName}
                        user={user}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mx-2 mt-auto text-sm">
              <div
                className={classNames(
                  "px-3 py-2 rounded cursor-pointer text-slate-600",
                  !sidebarOpen || "flex items-center gap-3 hover:bg-slate-50"
                )}
              >
                <User className="size-5 stroke-slate-500" />
                {!sidebarOpen || (
                  <div className="flex-1 flex items-center justify-between gap-x-3">
                    {"Profile"}
                    <ChevronRight className="size-4 stroke-slate-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop sidebar */}
      <div
        className={`${
          !sidebarOpen ? "w-fit" : "w-[300px]"
        } hidden h-screen sticky lg:flex flex-col left-0 top-0 p-4 bg-white`}
      >
        {/* Logo */}
        {sidebarOpen ? (
          <Image src={logo} alt="logo" className="h-8 w-fit" />
        ) : (
          <Image src={smallLogo} alt="logo" className="h-auto w-6 mb-6" />
        )}

        {/* Collapse Arrow */}
        <div
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          className={`absolute cursor-pointer group top-6 text-primary-900 p-0 hover:text-primary-950 rounded ${
            sidebarOpen ? "right-4" : "-right-3"
          }`}
        >
          {sidebarOpen ? (
            <ChevronsLeft className="size-4 stroke-dark-300 group-hover:stroke-dark-200" />
          ) : (
            <ChevronsRight className="size-4 stroke-dark-300 group-hover:stroke-dark-200" />
          )}
        </div>
        <div className="mt-6">
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map(
              (item) =>
                // store and role validation
                (item.accessStore == "default" ||
                  item.accessStore == user.storeType) &&
                (item.accessRole == "default" ||
                  item.accessRole == user.role) && (
                  <li key={item.name}>
                    {!item?.dropdown?.filter(
                      (item) =>
                        (item.accessStore == "default" ||
                          item.accessStore == user.storeType) &&
                        (item.accessRole == "default" ||
                          item.accessRole == user.role)
                    ).length > 0 ? (
                      <Link
                        href={item.href}
                        className={classNames(
                          item.href == pathName
                            ? "bg-primary-50 text-slate-600"
                            : "text-gray-500 hover:bg-primary-50 hover:text-slate-600",
                          "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.href == pathName
                              ? "text-slate-600"
                              : "text-gray-500 group-hover:text-slate-600",
                            !sidebarOpen ? "size-5" : "size-5",
                            "shrink-0 flex items-center"
                          )}
                        />
                        {!sidebarOpen || item.name}
                      </Link>
                    ) : (
                      <Dropdown
                        item={item}
                        sidebarOpen={sidebarOpen}
                        pathName={pathName}
                        user={user}
                      />
                    )}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="-mx-2 mt-auto text-sm">
          <div
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className={classNames(
              "px-3 py-2 rounded cursor-pointer text-slate-600",
              sidebarOpen
                ? "flex items-center gap-3 hover:bg-slate-50"
                : "hover:space-y-1 transition-all delay-300 ease-in-out"
            )}
          >
            {sidebarOpen || <ChevronUp className="size-4 stroke-slate-500" />}
            <User className="size-5 stroke-slate-500" />
            {!sidebarOpen || (
              <div className="flex-1 flex items-center justify-between gap-x-3">
                {"Profile"}
                <ChevronRight className="size-4 stroke-slate-500" />
              </div>
            )}
          </div>
          <ul
            className={classNames(
              isProfileMenuOpen || "hidden",
              "bg-white ring-1 ring-slate-50 absolute left-[101%] bottom-1 rounded min-w-[150px] space-y-2 p-4"
            )}
          >
            {userNavigation.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
