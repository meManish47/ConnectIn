"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getUserFromDbBySearchInput } from "../actions/prismaActions";
type User = {
  id: string;
  name: string;
  email: string;
  dob: Date;
  password: string;
  school: string;
  address: string;
};
export default function NavSearchBar() {
  const [inputVal, setInputVal] = useState("");
  const [userSearch, setUserSearch] = useState<User[]>([]);
  useEffect(() => {
    async function getUser() {
      const usersObj = await getUserFromDbBySearchInput(inputVal);
      console.log("this came", usersObj?.user);
      if (usersObj.success && usersObj.user) setUserSearch(usersObj.user);
      else setUserSearch([]);
    }
    if (inputVal) getUser();
  }, [inputVal]);
  return (
    <div className="w-[70%] h-[65%] flex items-center ms-10 relative">
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
      {inputVal && userSearch.length > 0 && (
        <div className="absolute max-h-100 w-[90%] left-8 top-10 flex flex-col rounded-lg shadow-[1px_1px_3px_rgb(0,0,0,0.5)] overflow-hidden">
          {userSearch.map((user) => {
            return (
              <div className="w-full h-10 bg-gray-200 text-black gap-2  font-medium text-sm flex cursor-pointer items-center px-4 tracking-wider   hover:bg-gray-300 transition duration-200 ease-in-out">
                <IoSearch size={16} />
                {user.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
