import React from "react";
import TransparentInput from "./TransparentInput";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ className, ...props }) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  return (
    <div className="flex-1 relative">
      <TransparentInput
        type={`${!isShowPassword ? "password" : "text"}`}
        {...props}
      />
      <span className="absolute right-3 top-[25%] size-fit cursor-pointer">
        {!isShowPassword ? (
          <Eye onClick={()=>setIsShowPassword(true)} className="size-5 stroke-gray-400" />
        ) : (
          <EyeOff onClick={()=>setIsShowPassword(false)} className="size-5 stroke-gray-400" />
        )}
      </span>
    </div>
  );
}
