import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";

export default function Header({}) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <Input placeholder="Search" />
      </div>
      <div>
        <Image
          alt=""
          width={40}
          height={40}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-8 w-8 rounded-full bg-gray-50"
        />
        <span className="hidden lg:flex lg:items-center">
          <span
            aria-hidden="true"
            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
          >
            Tom Cook
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="ml-2 h-5 w-5 text-gray-400"
          />
        </span>
      </div>
    </div>
  );
}
