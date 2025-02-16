"use client";

import { useSignup } from "@/hooks/useSignup";
import Link from "next/link";

export default function Signup() {
  const { register, handleSubmit, errors, onSubmit,Toaster } = useSignup();

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-800">
        Signup Page
      </h2>
      <div>
        <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">
          User Name
        </label>
        <input 
          id="userName" 
          type="text" 
          placeholder="Enter your User Name" 
          {...register("userName")}
          className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input 
          id="email" 
          type="email" 
          placeholder="Enter your Email" 
          {...register("emailID")}
          className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
        />
        {errors.emailID && <p className="text-red-500 text-sm">{errors.emailID.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <input 
          id="password" 
          type="password" 
          placeholder="Enter your Password" 
          {...register("password")}
          className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="admin" 
          {...register("role")} 
          className="accent-indigo-600"
        />
        <label htmlFor="admin" className="text-sm font-semibold">Admin</label>
      </div>
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md">
        Sign Up
      </button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href={"/auth/login"}>
          <span className="text-indigo-500 hover:underline">Log In</span>
        </Link>
      </p>
      <Toaster position="top-center"/>
    </form>
  );
}
