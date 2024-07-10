"use client";
import { ChevronDownIcon, Search } from "lucide-react";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

export default function Header({}) {
  const form = useForm();
  const { handleSubmit, reset } = form;
  const onSubmit = async (data) => {
    console.log("data", data);
  };
  return (
    <div className="pl-16 lg:pl-4 flex justify-between p-4 items-center gap-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="ml-4 bg-slate-100 rounded-md space-y-0 flex py-0 px-4 items-center">
                <Search className="size-6 stroke-slate-400" />
                <FormControl className="">
                  <Input
                    {...field}
                    placeholder="Search"
                    className="bg-transparent w-[300px] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex">
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
