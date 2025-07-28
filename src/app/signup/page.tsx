//@ts-nocheck
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import validateForm from "../utils/action";
import createUser from "../utils/createuser";
import toast from "react-hot-toast";
import { addUserToDB, getUserFromDBbyEmail } from "../actions/prismaActions";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  let debounceTimeout;
  let canShow = true;
  let userData = [];
  const router = useRouter();
  const [isSigning, setIsSigning] = useState(false);
  async function createuserinDb(formdata) {
    const values = {
      name: formdata.get("name") as string,
      dob: {
        dob_day: formdata.get("dob_day") as string,
        dob_month: formdata.get("dob_month") as string,
        dob_year: formdata.get("dob_year") as string,
      },
      email: formdata.get("email") as string,
      school: formdata.get("school") as string,
      address: formdata.get("address") as string,
      password: formdata.get("password") as string,
    };
    const dobString = `${values.dob.dob_year}-${values.dob.dob_month.padStart(
      2,
      "0"
    )}-${values.dob.dob_day.padStart(2, "0")}`;
    const dobDate = new Date(dobString);
    const userToCreate = {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      dob: dobDate,
      password: formdata.get("password") as string,
      school: formdata.get("school") as string,
      address: formdata.get("address") as string,
    };
    const userCreatedObj = await addUserToDB(userToCreate);
    if (userCreatedObj.success) {
      toast.success("User added in database");
    } else {
      console.log(userCreatedObj.message);
    }
  }

  async function handleAction(formdata: FormData) {
    clearTimeout(debounceTimeout);
    setIsSigning(true);
    const createUserObj = await createUser(formdata);
    // console.log(createUserObj);
    if (!createUserObj.success) {
      if (canShow) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } bg-white border-l-6 border-red-600 text-black p-4 rounded shadow-[1px_1px_10px_rgb(0,0,0,0.7  )] max-w-sm w-full `}
            >
              <ul className="list-disc list-inside text-sm space-y-1">
                {createUserObj.errors?.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          ),
          {
            duration: 2000,
          }
        );
      }
      canShow = false;
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        canShow = true;
      }, 1000);
    } else {
      console.log(formdata.get("email"));
      const currentUserObj = await getUserFromDBbyEmail(formdata.get("email"));
      console.log(currentUserObj);
      if (currentUserObj?.success) {
        toast.error("User already exists. Please Log in", {
          duration: 2000,
        });
        setIsSigning(false);
        console.log("EXISTSS");
      }
      //Functiion to create the user after checking if it doesnt exists
      else {
        console.log(isSigning);
        await createuserinDb(formdata);
        setIsSigning(false);
        console.log(isSigning);
        router.push("/login");
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-white via-sky-200 to-[#1D6FAA] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl max-w-4xl w-full flex overflow-hidden">
        {/* Left Side Logo */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-[#02162c] p-10">
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src="/MainLogo.png"
            alt="Logo"
            width={350}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-[#1D6FAA] mb-6 tracking-wide">
            Create an Account
          </h2>
          <form
            className="space-y-4 text-sm text-gray-700"
            onSubmit={async (e) => {
              e.preventDefault();
              const formdata = new FormData(e.currentTarget);
              await handleAction(formdata);
            }}
          >
            {/* Full Name */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your full name"
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
              />
            </div>

            {/* DOB */}
            <div className="flex flex-col space-y-1">
              <label>
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  name="dob_day"
                  placeholder="DD"
                  maxLength={2}
                  value={dob.day}
                  onChange={(e) =>
                    setDob({ ...dob, day: e.target.value.replace(/\D/g, "") })
                  }
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-center focus:outline-[#1D6FAA]"
                />
                <input
                  type="text"
                  name="dob_month"
                  placeholder="MM"
                  maxLength={2}
                  value={dob.month}
                  onChange={(e) =>
                    setDob({ ...dob, month: e.target.value.replace(/\D/g, "") })
                  }
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-center focus:outline-[#1D6FAA]"
                />
                <input
                  type="text"
                  name="dob_year"
                  placeholder="YYYY"
                  maxLength={4}
                  value={dob.year}
                  onChange={(e) =>
                    setDob({ ...dob, year: e.target.value.replace(/\D/g, "") })
                  }
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-center focus:outline-[#1D6FAA]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your@email.com"
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Choose a secure password"
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
              />
            </div>

            {/* School / College */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="school">
                School / College <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="school"
                id="school"
                placeholder="e.g. MIT, Delhi University"
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="address">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                id="address"
                rows={2}
                placeholder="Your full address"
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA] resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#1D6FAA] hover:bg-[#174e87] text-white font-semibold rounded-md py-2 transition duration-300"
            >
              {!isSigning ? <span>Sign in</span> : <span>Wait</span>}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="text-[#1D6FAA] font-medium cursor-pointer underline">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
