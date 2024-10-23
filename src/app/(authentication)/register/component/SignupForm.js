"use client";
import PasswordInput from "@/components/PasswordInput";
import SubmitButton from "@/components/SubmitButton";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name is required!"),
  email: z.string().email(),
  image: z.string().optional(),
  phone: z.string().optional(),
  facebook: z.string().optional(),
  password: z.string().min(6, "Min 6 length required!"),
});
export default function SignupForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      phone: "",
      facebook: "",
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
        {/* Name account */}
        <TextInput
          form={form}
          name="name"
          placeholder="Name*"
          icon={<UserRound className="size-[16px] stroke-gray-500" />}
        />

        {/* Email account */}
        <TextInput
          form={form}
          name="email"
          placeholder="Email*"
          type="email"
          icon={<Mail className="size-[16px] stroke-gray-500" />}
        />
        {/* Phone number */}
        <TextInput
          form={form}
          name="phone"
          placeholder="Phone*"
          type="number"
          icon={<Phone className="size-[16px] stroke-gray-500" />}
        />
        <Separator />

        {/* Profile picture */}
        <TextInput
          form={form}
          name="image"
          placeholder="Profile picture"
          type="file"
        />
        {/* Facebook profile url */}
        <TextInput
          form={form}
          name="facebook"
          placeholder="Facebook profile URL"
          type="url"
        />

        {/* Password field */}
        <PasswordInput name="password" form={form} placeholder="Password*" />

        {/* Submit button */}
        <SubmitButton form={form} btnTitle="Register" />
      </form>
    </Form>
  );
}
