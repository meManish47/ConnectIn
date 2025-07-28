"use client";
import { TbLogout } from "react-icons/tb";
import { deleteCookies } from "../actions/actions";
import { useRouter } from "next/navigation";
export default function LogoutItem() {
  const router = useRouter();
  function handleLogout() {
    deleteCookies();
    router.refresh();
  }
  return (
    <div
      className="w-full flex items-center cursor-pointer justify-between pr-2"
      onClick={handleLogout}
    >
      Logout
      <TbLogout />
    </div>
  );
}
