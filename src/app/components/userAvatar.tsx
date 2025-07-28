import { DropdownMenu } from "@radix-ui/themes";
import Image from "next/image";
import LogoutItem from "./logoutItem";

export default function UserAvatar(){
    return(
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger>
            <div className="w-8 h-8 flex items-center justify-center  border-1 border-gray-500  rounded-[50%] cursor-pointer overflow-hidden">
              <Image
                src={"/default_user.png"}
                alt="PFP"
                height={42}
                width={42}
              ></Image>
            </div>
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
              <LogoutItem />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}