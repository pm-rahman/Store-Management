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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-1">
              <FormControl>
                <TransparentInput
                  error={form.formState.errors.name}
                  value={field.value}
                  placeholder="Username or Email"
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
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <Button className='w-full hover:bg-primary-700'>
            {/* {form.formState.isSubmitting&&} */}
            Sign In
            </Button>
      </form>
    </Form>
  );
}
