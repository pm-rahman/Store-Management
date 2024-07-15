import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function PageTitle({ title }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-heading font-semibold text-2xl">{title}</h2>
      <Breadcrumb />
    </div>
  );
}
