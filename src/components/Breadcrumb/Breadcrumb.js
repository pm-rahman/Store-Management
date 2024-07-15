"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  const path = usePathname();
  const pathName = path.slice(1);
  return (
    <div className="capitalize">
      <Link className="text-primary" href="/dashboard">
        Dashboard
      </Link>{" "}
      {pathName.length > 0 && "/"} <span>{pathName}</span>
    </div>
  );
}
