"use client";
import TransparentInput from "@/components/TransparentInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(3, "Name is Required!"),
  username: z.string().min(3, "Min 3 character is Required!"),
  email: z.string().email(),
  profile: z.string().optional(),
});
export default function SignupForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  /* Sign in Handler */
  const onSubmit = (data) => {
    console.log("data:", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-1">
              <FormControl>
                <TransparentInput
                  error={form.formState.errors.name}
                  value={field.value}
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-1">
              <FormControl>
                <TransparentInput
                  error={form.formState.errors.username}
                  value={field.value}
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-1">
              <FormControl>
                <TransparentInput
                  error={form.formState.errors.email}
                  value={field.value}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-1">
              <FormControl>
                <PasswordInput
                  error={form.formState.errors.password}
                  value={field.value}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <Button className="w-full hover:bg-primary-700">
          {/* {form.formState.isSubmitting&&} */}
          Register
        </Button>
      </form>
    </Form>
  );
}
