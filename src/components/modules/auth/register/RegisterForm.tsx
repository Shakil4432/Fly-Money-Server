"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import Logo from "@/assets/svgs/Logo";
import { useUser } from "@/context/UserContext";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const { setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 w-full"
      style={{
        backgroundImage: "url('/register.png')", // Make sure image exists in /public
      }}
    >
      <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 w-full max-w-md shadow-lg text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <Logo />
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <h1 className="text-2xl font-semibold">Register</h1>
            <p className="text-sm text-gray-300">
              Join us today and start your journey!
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="bg-[#222222] text-white border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      value={field.value || ""}
                      className="bg-[#222222] text-white border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                      className="bg-[#222222] text-white border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                      className="bg-[#222222] text-white border-gray-600"
                    />
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage>Passwords do not match</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button
              disabled={passwordConfirm && password !== passwordConfirm}
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
