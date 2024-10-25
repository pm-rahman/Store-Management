"use client";
import PasswordInput from "@/components/PasswordInput";
import SubmitButton from "@/components/SubmitButton";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, UserRound } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is Required!"),
  password: z.string().min(6, "Min 6 character Required!"),
});
export default function SigninForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /* Sign in Handler */
  const onSubmit = (data) => {
    console.log("data:", data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-8 mt-2"
      >
        {/* Text input */}
        <TextInput
          form={form}
          name="name"
          placeholder="Enter name"
          icon={<UserRound className="size-[16px] stroke-gray-500" />}
        />
        {/* Password field */}
        <PasswordInput
          name="password"
          form={form}
          placeholder="Enter password"
          icon={<Lock className="size-[16px] stroke-gray-500" />}
        />
        {/* Submit button */}
        <SubmitButton form={form} btnTitle="Sign In" />
      </form>
    </Form>
  );
}
