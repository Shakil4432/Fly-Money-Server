"use client";
import dynamic from "next/dynamic";

const LoginForm = dynamic(
  () => import("@/components/modules/auth/login/LoginForm"),
  { ssr: false }
);

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
