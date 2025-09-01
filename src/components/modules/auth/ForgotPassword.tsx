"use client";

import { useState } from "react";
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
import {
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "@/services/AuthService";
import { useRouter } from "next/navigation";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const otpSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 digits"),
});

const resetSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const router = useRouter();

  // forms for each step
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
  });

  const handleEmailSubmit = async (data: FieldValues) => {
    try {
      const res = await forgotPassword(data.email);
      if (res.success) {
        setEmail(data.email);
        toast.success("OTP sent to your email!");
        setStep("otp");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (data: FieldValues) => {
    try {
      const res = await verifyOtp(email, data.otp);
      if (res.data?.resetToken) {
        setResetToken(res.data?.resetToken);
        toast.success("OTP verified!");
        setStep("reset");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Invalid OTP");
    }
  };

  const handleResetSubmit = async (data: FieldValues) => {
    try {
      const res = await resetPassword(resetToken, data.newPassword);
      if (res.message) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" p-6 rounded-xl bg-gray-100 border w-full max-w-md space-y-4 text-gray-500">
        {step === "email" && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className=" text-white"
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
                Send OTP
              </Button>
            </form>
          </Form>
        )}

        {step === "otp" && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
              className="space-y-4"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter OTP"
                        className=" text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full  bg-[#7c3f00] hover:bg-[#7c3f00]/80"
              >
                Verify OTP
              </Button>
            </form>
          </Form>
        )}

        {step === "reset" && (
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(handleResetSubmit)}
              className="space-y-4"
            >
              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Enter new password"
                        className=" text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full  bg-[#7c3f00] hover:bg-[#7c3f00]/80"
              >
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
