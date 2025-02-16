import { useAdmin } from "@/hooks/useAdmin";
import { useSignup } from "@/hooks/useSignup";

export interface AddUserInterface{
    onClose :()=>void;
    getUser:()=>void;
}

export default function AddUser({onClose,getUser}:AddUserInterface) {
  const { register, handleSubmit, errors, onSubmit, Toaster } = useAdmin();
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleSubmit(onSubmit(onClose))}>
                <div>
                    <label
                        htmlFor="userName"
                        className="block text-sm font-semibold text-gray-700"
                        >
                        User Name
                    </label>
                    <input
                        id="userName"
                        type="text"
                        placeholder="Enter your User Name"
                        {...register("userName")}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                        />
                        {errors.userName && (
                        <p className="text-red-500 text-sm">{errors.userName.message}</p>
                        )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700"
                        >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        {...register("emailID")}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                        />
                        {errors.emailID && (
                        <p className="text-red-500 text-sm">{errors.emailID.message}</p>
                        )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700"
                        >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        {...register("password")}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                        />
                        {errors.password && (
                        <p 
                            className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                         )}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="admin"
                        {...register("role")}
                        className="accent-indigo-600"
                        />
                        <label htmlFor="admin" className="text-sm font-semibold">
                        Admin
                        </label>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={(e)=>{
                            e.preventDefault()
                            onClose()
                        }}
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 transition duration-300"
                        >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                    Save
                    </button>
                </div>
            </form>
      </div>
    </div>
  );
}
