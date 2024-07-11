"use client";
import {
  Bell, Menu,
  MessageSquareWarning,
  Search
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

export default function Header({ setMobileSidebarOpen }) {
  const form = useForm();
  const { handleSubmit, reset } = form;
  const onSubmit = async (data) => {
    console.log("data", data);
  };
  return (
    <div className="flex justify-between p-4 items-center gap-2">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Mobile open menu bar */}
        <div className="lg:hidden flex items-center gap-4 sm:gap-6">
          <div onClick={() => setMobileSidebarOpen(true)}>
            <Menu className="size-6 stroke-slate-500" />
          </div>
          <div className="h-10 border-r" />
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="lg:ml-4 bg-slate-100 rounded-md space-y-0 flex py-0 px-4 items-center">
                  <Search className="size-6 stroke-slate-400" />
                  <FormControl className="">
                    <Input
                      {...field}
                      placeholder="Search"
                      className="bg-transparent sm:w-[300px] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      {/* Right side */}
      <div className="flex gap-3 sm:gap-10 xl:gap-12 items-center">
        <div className="flex gap-2 sm:gap-4 lg:gap-5 items-center">
          <MessageSquareWarning className="size-5 stroke-slate-500" />
          <Bell className="size-5 stroke-slate-500" />
        </div>

        <div className="relative flex gap-1 sm:gap-2 items-center">
          <div className="hidden lg:flex lg:items-center">
            <div
              aria-hidden="true"
              className="text-sm flex flex-col text-gray-900 text-end"
            >
              <span className="font-semibold">Tom Cook</span>
              <span>Admin Manager</span>
            </div>
          </div>
          <Image
            alt=""
            width={40}
            height={40}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
