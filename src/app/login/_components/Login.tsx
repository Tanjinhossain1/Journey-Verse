"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [demoAccount, setShowDemo] = useState<boolean>(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setLoginError("Invalid email or password");
    } else {
      // Handle successful login (redirect or show success message)
      window.location.reload();
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 dark:bg-[#1c1c1d] ">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-xl border-gray-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginError && (
            <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="rounded-xl border-gray-300"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="rounded-xl border-gray-300"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="relative mt-4 mb-2">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-md">
                Or continue with
              </span>
            </div>
          </div>
          <hr className="border-gray-400 mb-2" />
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full border-gray-300 rounded-xl"
            >
              <FaGoogle className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('github')}
              className="w-full border-gray-300 rounded-xl"
            >
              <FaGithub className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link href="/register" className="text-primary hover:underline">
              Don't have an account? <span className="text-blue-700">Register here</span>
            </Link>
          </div>
          <Button
            variant="ghost"
            className="rounded-xl bg-black text-white"
            onClick={() => setShowDemo(!demoAccount)}
          >
            {demoAccount ? "Hide" : "See Demo Accounts"}
          </Button>
          {demoAccount && (
            <div className="text-sm space-y-2">
              <div>
                <p className="font-bold">Admin</p>
                <p>Email: tanjinhossain2003@gmail.com</p>
                <p>Password: 000000</p>
              </div>
              <div>
                <p className="font-bold">User</p>
                <p>Email: demouser@gmail.com</p>
                <p>Password: 000000</p>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

