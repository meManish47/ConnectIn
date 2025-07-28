"use client";
import Image from "next/image";
import Link from "next/link";
import { setCookies } from "../actions/actions";
import { getUserFromDBbyEmail } from "../actions/prismaActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  //@ts-ignore
  async function handleLoginSumbit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setCookies(email);
    const userExistsObj = await getUserFromDBbyEmail(email);
    if (userExistsObj?.success) {
      if (userExistsObj.user?.password === password) {
        router.push("/");
      } else {
        toast.error("Invalid password!! Please try again.", { duration: 2000 });
      }
    } else {
      toast.error("User does not exists .....");
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-start py-10 gap-15 items-center bg-[linear-gradient(300deg,_#1D6FAA_20%,_#162a3f_60%)]">
      <div>
        <Image
          src={"/MainLogo.png"}
          alt="Image"
          height={100}
          width={400}
          className="h-16 w-80"
        ></Image>
      </div>
      <div className="min-h-[75vh] min-w-[25vw]  shrink rounded-4xl flex flex-col items-center py-4 border-gray-200 bg-[#041a31] shadow-[-4px_2px_22px_rgb(0,0,0,0.7)] inset-shadow-[-8px_-6px_14px_rgb(29,111,170,0.7)]">
        <form
          className=" px-2 py-2 w-10/11 h-full  flex flex-col gap-8  items-center "
          onSubmit={handleLoginSumbit}
        >
          <div className="flex flex-col gap-4 items-start justify-between pb-2 mt-4 mb-4">
            <div className=" text-3xl ms-6 font-bold mb-1  tracking-widest text-white">
              LogIn
            </div>
            <div className="w-[23vw] flex justify-center">
              <hr className="w-11/12 h-[1px] bg-gray-300  border-none" />
            </div>
          </div>

          <div className="h-10 w-13/14 mt-2 flex flex-col">
            <label htmlFor="username" className="text-sm text-gray-100">
              Enter your email <span className="text-red-500">*</span>
            </label>
            <input
              className="h-10 p-2 placeholder:text-sm text-white tracking-widest  w-full border border-t-0 border-l-0 border-r-0 border-b-2 border-gray-400 focus:focus:outline-none"
              type="text"
              name="email"
              id="email"
              placeholder="Username"
            />
          </div>
          <div className="h-10 w-13/14 mb-10 flex flex-col">
            <label htmlFor="username" className="text-sm text-gray-100">
              Enter your password<span className="text-red-500">*</span>
            </label>
            <input
              className="h-10 p-2 w-full border border-t-0 border-l-0 border-r-0 border-b-2 border-gray-400 focus:outline-none placeholder:text-sm tracking-widest text-white"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            />

            <div className="text-blue-600 text-xs mt-2 items-end self-end cursor-pointer">
              Forgot Password?
            </div>
          </div>
          <div className="w-full flex justify-center relative right-2">
            <button className="w-[60%] h-10 rounded-3xl bg-[#1D6FAA] text-white text-base tracking-widest font-medium cursor-pointer hover:scale-98 transition ease-in-out hover:bg-[#1B5A89]">
              {" "}
              LOGIN
            </button>
          </div>
          <div className="text-xs self-center text-gray-100 ">
            Not a member?{" "}
            <Link href={"/signup"}>
              {" "}
              <span className="font-semibold text-gray-400 cursor-pointer underline">
                SignUp now
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
