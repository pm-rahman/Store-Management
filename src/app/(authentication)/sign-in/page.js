import Link from "next/link";
import React from "react";
import SigninForm from "./component/SigninForm";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="pb-6 bg-slate-50 border border-t-2 drop-shadow-sm h-fit w-1/3">
        {/* Header */}
        <div className="flex h-14 font-semibold text-heading">
          <Link
            href="/sign-in"
            className="h-full bg-slate-200 flex flex-1 items-center justify-center"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="h-full flex flex-1 items-center justify-center"
          >
            Register
          </Link>
        </div>
        {/* Form */}
        <SigninForm />

        {/* Forgat Link */}
        <div className='flex justify-center'>
          <Link href="#" className="underline">
            Forgat your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
