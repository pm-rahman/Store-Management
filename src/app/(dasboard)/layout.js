"use client";
import Header from "@/components/Header";
import Sidebar from "../../components/Sidebar";
import React from "react";
import "../globals.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  return (
    <div className="flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
      />
      <main className="flex-1">
        <Header setMobileSidebarOpen={setMobileSidebarOpen} />
        <div className="lg:p-4 bg-slate-50 min-h-screen">{children}</div>
      </main>
    </div>
  );
}
