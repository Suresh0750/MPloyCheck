import { useEffect, useState } from "react";

export interface InputInterface {
    name: string;
    type: string;
    value: { [key: string]:  string};
    setValue: (val: { [key: string]: string }) => void;

}

export interface prevDataTypes { [key: string]: string; }

export default function Input({ name, type, value, setValue}: InputInterface) {

    const [inputVal,setInputVal] = useState('')
    useEffect(()=>{
        setInputVal(value[name])
    },[])
    const handleInput = (val:string)=>{
        if(val.length){
            setInputVal(val)
            setValue({ ...value, [name]: val})
        }else{
            setInputVal(val)
            setValue({ ...value, [name]: ''})
        }
    }
    return (
        <>
            <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
                {name}
            </label>
            <input
                type={type}
                id={name}
                value={inputVal} 
                onChange={(e) => handleInput((e.target.value).trim())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </>
    );
}
