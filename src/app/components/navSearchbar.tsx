"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
export default function NavSearchBar() {
  const [inputVal, setInputVal] = useState("");
  const [userSearch,setUserSearch] =useState([]);
  useEffect(()=>{
    
  },[])
  return (
    <div className="w-[70%] h-[65%] flex items-center ms-10">
      <div className="w-full h-full rounded-4xl bg-white flex items-center px-3 gap-2 border-2 border-gray-400">
        <label htmlFor="navSearch">
          <IoSearch size={20} className="text-gray-600" />
        </label>
        <input
          type="text"
          id="navSearch"
          placeholder={`Search...`}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className=" w-full h-full bg-white  tracking-widest text-base focus:outline-none"
        />
      </div>
    </div>
  );
}
