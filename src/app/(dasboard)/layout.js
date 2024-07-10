import Header from "@/components/Header";
import Sidebar from "../../components/Sidebar";
import React from "react";
import "../globals.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="lg:p-4 bg-slate-50 min-h-screen">{children}</div>
      </main>
    </div>
  );
}
