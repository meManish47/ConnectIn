import Image from "next/image";
import UploadInputField from "./upload_post_inputField";

export default async function UploadPost() {
  return (
    <div className="w-full h-30  bg-white flex p-2 shadow-2xl rounded-lg border-gray-300">
      <div className="w-1/8 h-full  flex justify-center items-center ">
        <div className=" flex justify-center items-center h-16 w-16 border-1 border-gray-400 rounded-[50%] bg-white overflow-hidden ">
          <Image
            src={"/default_user.png"}
            height={80}
            width={80}
            alt="User"
          ></Image>
        </div>
      </div>
      <div className="w-7/8 h-full  flex justify-center items-center ">
        <div className="flex justify-center items-center px-2 w-full">
          <UploadInputField />
        </div>
      </div>
    </div>
  );
}
