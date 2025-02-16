
import { useDispatch } from "react-redux"
import { setSearch } from "@/redux/slices/serachSlice"

export default function SearchBar(){
    const dispatch = useDispatch()

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearch(e.target.value))
    }
    return(
        <>
        <input
         type="search"  
         className="p-2 mt-1 border-2  rounded border-solid border-1 border-gray-800 focus:border-indigo-500 focus:ring-indigo-300 focus:ring-opacity-50"
         placeholder="Search"
         onChange={handleSearch}    
         />
        </>
    )
}