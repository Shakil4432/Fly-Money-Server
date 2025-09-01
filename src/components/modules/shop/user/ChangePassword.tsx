"use client";

import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { changePassword } from "@/services/AuthService";

// Zod schema for form validation
const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export default function ChangePassword() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const res = await changePassword(data.oldPassword, data.newPassword);
      if (res.message) {
        toast.success(res.message);
        router.push("/profile"); // or wherever you want
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 rounded-xl bg-gray-100 border w-full max-w-md space-y-4 text-gray-500">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter old password"
                      className="text-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter new password"
                      className="text-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#7c3f00] hover:bg-[#7c3f00]/80"
            >
              Change Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
