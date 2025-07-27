import { IoSearch } from "react-icons/io5";

export default function NavSearchBar() {
  return (
    <div className="w-[50%] h-[65%] flex items-center ">
      <div className="w-full h-full rounded-4xl bg-white flex items-center px-3 gap-2 border-2 border-gray-400">
        <label htmlFor="navSearch">
          <IoSearch size={20} className="text-gray-600" />
        </label>
        <input
          type="text"
          id="navSearch"
          placeholder={`Search...`}
          className=" w-full h-full bg-white  tracking-widest text-base focus:outline-none"
        />
      </div>
    </div>
  );
}
