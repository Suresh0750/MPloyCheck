


import { useRecord } from "@/hooks/useRecord"
import { recordAccessLevel } from "@/config/constants";


export interface IAddRecord{
    onClose : ()=>void;
    userId : string;
}
export default function AddRecord({onClose,userId}:IAddRecord){
    const {handleSubmit,onSubmit,register,errors,Toaster} = useRecord()
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Add Record</h2>
              <form onSubmit={handleSubmit((onSubmit(onClose)))}>
                    <input type="hidden" value={userId}
                     {...register("userId")}
                      />
                  <div>
                      <label
                          htmlFor="recordName"
                          className="block text-sm font-semibold text-gray-700"
                          >
                          Record Name
                      </label>
                      <input
                          id="recordName"
                          type="text"
                          placeholder="Enter your User Name"
                          {...register("recordName")}
                          className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                          />
                          {errors.recordName && (
                          <p className="text-red-500 text-sm">{errors.recordName.message}</p>
                          )}
                  </div>
  
                  <div>
                      <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700"
                          >
                          Data
                      </label>
                      <input
                          id="data"
                          type="text"
                          placeholder="Enter your Email"
                          {...register("data")}
                          className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                          />
                          {errors.data && (
                          <p className="text-red-500 text-sm">{errors.data.message}</p>
                          )}
                  </div>
  
                  <div className="mt-4">
                        <label
                            htmlFor="accessLevel"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Access Level
                        </label>
                        <select
                            id="accessLevel"
                            {...register("accessLevel")}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition duration-300 appearance-none"
                        >
                            {recordAccessLevel?.map((level: string) => (
                            <option key={level} value={level} className="text-gray-900">
                                {level}
                            </option>
                            ))}
                        </select>
                        {errors.accessLevel && (
                            <p className="text-red-500 text-sm mt-1">{errors.accessLevel.message}</p>
                        )}
                    </div>
                  <div className="flex justify-between mt-2">
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
              <Toaster position="top-center" />
        </div>
      </div>
    )
}