import Image from "next/image";
import NavSearchBar from "./navSearchbar";
import { IoHome } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { DropdownMenu } from "@radix-ui/themes";
import LogoutItem from "./logoutItem";
import UserAvatar from "./userAvatar";

export default function HeaderComponent() {
  return (
    <div className="h-14 w-screen flex px-47 gap-4 sticky top-0  bg-[#d4c9beb9] backdrop-blur-2xl items-center border border-y-1 border-gray-400">
      <Image
        src={"https://i.postimg.cc/jnqm3zqM/darklogo.png"}
        alt="Image"
        height={48}
        width={48}
        className="h-10 w-10 rounded-lg "
      ></Image>
      <NavSearchBar />
      <div className="flex items-center justify-start gap-12 px-4 h-full w-[35vw]  ms-62">
        <IoHome
          size={24}
          className="text-[#545454] hover:text-[#282828] cursor-pointer hover:underline"
        />
        <MdPeopleAlt
          size={28}
          className="text-[#545454] hover:text-[#282828] cursor-pointer hover:underline"
        />
        <FaBell
          size={24}
          className="text-[#545454] hover:text-[#282828] cursor-pointer hover:underline"
        />
        <UserAvatar />
      </div>
    </div>
  );
}
