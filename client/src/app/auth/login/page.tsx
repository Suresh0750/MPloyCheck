"use client"
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";



export default function Login() {

    const {onSubmit,handleSubmit,errors,register,Toaster} = useLogin()

    return (
      
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Login Page  
          </h2>
  
          <div>
            <label htmlFor="userID" className="block text-sm font-semibold text-gray-700">
              User ID
            </label>
            <input
              id="userID"
              type="text"
              placeholder="Enter your User ID"
              {...register('userID')}

              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              
            />
            {errors.userID && <p className="text-red-500 text-sm mt-2">{errors.userID.message}</p>}
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password"
              {...register('password')}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md">
            Log In
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href={'/auth/signup'}>
              <span className="text-indigo-500 hover:underline">
                Sign up
              </span>
              
            </Link>
          </p>
          <Toaster position="top-center"/>
        </form> 
    );
  }
  