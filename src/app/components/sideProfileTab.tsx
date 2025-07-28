import Image from "next/image";
import { getUserFromDBbyEmail } from "../actions/prismaActions";
import { getCurrentUserEmail } from "../utils/action";

export default async function SideProfileTab() {
  const currentUserEmail = await getCurrentUserEmail();
  if (!currentUserEmail) {
    return (
      <div className="w-full h-full flex justify-center items-center absolute ">
        <h2>Something went Wrong</h2>
      </div>
    );
  }
  const currentUserObj = await getUserFromDBbyEmail(currentUserEmail);
  console.log(currentUserObj);
  return (
    <div className="w-full h-full flex flex-col absolute bg-[#e5dfd9]">
      <div className="w-full h-[35%] bg-gray-300 flex justify-center border-b-1 items-center overflow-hidden">
        <Image
          src={"/default_cover.png"}
          height={80}
          width={120}
          alt="Cover"
        ></Image>
      </div>
      <div className="absolute flex justify-center items-center h-20 w-20 border-1 rounded-[50%] bg-white left-4 top-10 overflow-hidden">
        <Image
          src={"/default_user.png"}
          height={80}
          width={80}
          alt="User"
        ></Image>
      </div>
      <div className="w-full max-h-[65%] flex flex-col p-4  justify-end gap-2 pb-4 pt-10 flex-wrap">
        <div className="w-[80%] h-max ">
          {currentUserObj?.user?.name}
          <hr className="text-gray-400" />
        </div>
        <div className="w-max h-max flex flex-wrap text-wrap  text-gray-500 text-sm">
          {currentUserObj?.user?.email}
        </div>
        <div className="w-full h-max  text-gray-800 text-base font-light flex flex-wrap">
          {currentUserObj?.user?.school}
        </div>
      </div>
    </div>
  );
}
