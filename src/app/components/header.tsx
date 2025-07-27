import Image from "next/image";
import NavSearchBar from "./navSearchbar";
import { IoHome } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { DropdownMenu } from "@radix-ui/themes";

export default function HeaderComponent() {
  return (
    <div className="h-14 w-screen flex px-47 gap-4 sticky top-0  bg-[#F1EFEC] items-center border border-y-1 border-gray-400">
      <Image
        src={"https://i.postimg.cc/jnqm3zqM/darklogo.png"}
        alt="Image"
        height={48}
        width={48}
        className="h-10 w-10 rounded-lg "
      ></Image>
      <NavSearchBar />
      <div className="flex items-center justify-start gap-12 px-4 h-full w-[35%]  ms-22">
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
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger>
            <div className="w-8 h-8 flex items-center justify-center bg-blue-400 border-2  rounded-[50%] cursor-pointer"></div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            side="bottom"
            align="start"
            alignOffset={-90}
            className="bg-white rounded-sm shadow-md  border border-gray-200 w-30"
            color="gold"
            highContrast
          >
            <DropdownMenu.Item className="h-5 rounded-4xl">
              <span className=" cursor-pointer">Profile</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span className=" cursor-pointer">Help</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <span className=" cursor-pointer">Settings</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
