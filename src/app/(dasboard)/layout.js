import "../globals.css";
import Header from "@/components/Header";
import Sidebar from "../../components/Siderbar";
import React from "react";
// import AuthProvider from "@/components/AuthProvider";

export default function DashboardLayout({ children }) {
  return (
    <body className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="lg:ml-7">{children}</div>
      </main>
    </body>
  );
}
