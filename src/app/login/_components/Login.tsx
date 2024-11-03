"use client";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  return (
    <Fragment>
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black dark:border-t dark:border-gray-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md w-96 dark:bg-gray-300 dark:border-2 dark:border-gray-300"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <Link href="/register" className="text-blue-500">
              {`Don't`} have an account? Register here
            </Link>
          </div>
          <Button
            variant={"ghost"}
            className="bg-black text-center items-center hover:bg-black text-white mt-2 hover:text-white"
            type="button"
            onClick={() => setShowDemo(!demoAccount)}
          >
            {demoAccount ? "Hide" : "See Demo Accounts"}
          </Button>
          {
            demoAccount ? 
           <Fragment>
            <p className="font-bold mt-2">Admin</p>
             <p>Email: tanjinhossain2003@gmail.com</p>
             <p>Password: 000000</p>
              <hr />
            <p className="font-bold mt-2">User</p>
             <p>Email: demouser@gmail.com</p>
             <p>Password: 000000</p>

           </Fragment>
            :null
          }
        </form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
