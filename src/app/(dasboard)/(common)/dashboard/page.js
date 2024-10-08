import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import React from "react";

export default function Dashboard({}) {
  return (
    <>
      {/* top bar */}
      <div className="flex justify-between items-center">
        <DatePickerWithRange />
        <Button className='text-white'>Export</Button>
      </div>
    </>
  );
}
