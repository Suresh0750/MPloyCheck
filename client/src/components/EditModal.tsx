import { IUser } from "@/types/user";
import type React from "react";
import Input from "./Input";
import { useEffect, useState } from "react";
import { emailValidator, userNameValidator } from "@/lib/validators/authSchema";

interface EditModalProps {  
  onSave: (data: any) => void;
  onClose: () => void;
  data: IUser;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, data,onSave }) => {
    
  const [value, setValue] = useState<{ [key: string]: string }>({
    Name: data?.userName || "",
    Email: data?.emailID || ""
  });
  const [error,setError] = useState<{ [key: string]: boolean }>({
    Name: false,
    Email:false
  })

  useEffect(() => {
    setValue({
      Name: data?.userName || "",
      Email: data?.emailID || ""
    });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!", value);
    if(!userNameValidator(value?.Name)){
        return setError({Name:true})
    }else{
        setError({Name:false})
    }
    if(!emailValidator(value?.Email)){
        return setError({Email:true})
    }else{
        setError({Email:false})
    }

    if(value?.Name!=data?.userName || value?.Email!=data?.emailID){
      try {   
        await onSave({...data,userName:value?.Name,emailID:value?.Email})
          
      } catch (error) {
        console.log(error)
      }
    }
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">    
            <Input 
              name="Name" 
              type="text" 
              value={value} 
              setValue={setValue} 
            />
            {error?.Name && <p className="text-red-500">Invalid User Name</p>}
          </div>
          <div className="mb-4">
            <Input 
              name="Email" 
              type="text" 
              value={value} 
              setValue={setValue} 
            />
            {error?.Email && <p className="text-red-500">Invalid User Email</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
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
};

export default EditModal;
