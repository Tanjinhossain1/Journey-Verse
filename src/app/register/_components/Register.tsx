"use client";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { hash } from "bcryptjs";
import { Button } from "@/components/ui/button";

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [demoAccount,setShowDemo]=useState<boolean>(false)
  const onSubmit = async (data: RegisterFormData) => {
    const hashedPassword = await hash(data?.password, 12);
    const submitedData = {
      ...data,
      password: hashedPassword,
      role: "user",
      // role: "admin",
    };
    try {
      await axios
        .post("/api/user", submitedData)
        .then((response) => {
          if (response) {
            console.log("first res", response);
          }
          setSuccessMessage("Registration successful! You can now login.");
          setErrorMessage("");

          setTimeout(() => {
            router.push("/login");
          }, 100);
        })
        .catch((err) => {
          setErrorMessage(err?.message);
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response?.data.message || "Registration failed.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className={`w-full border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } p-2 rounded`}
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>
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
          Register
        </button>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500">
            Already have an account? Login here
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
  );
};

export default RegisterPage;
