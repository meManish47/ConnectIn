//@ts-nocheck
"use client";
import { getUserFromDBbyEmail } from "@/app/actions/prismaActions";
import createUser from "@/app/utils/createuser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiArrowNarrowRight } from "react-icons/hi";
import createuserinDb from "./userActions";

export default function UserDetailsForm() {
  const router = useRouter();
  const [isSigning, setIsSigning] = useState(false);
  const [dob, setDob] = useState({ day: "", month: "", year: "" });

  async function handleAction(formdata: FormData) {
    setIsSigning(true);
    const createUserObj = await createUser(formdata);
    if (!createUserObj.success) {
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

      setIsSigning(false);
    } else {
      const currentUserObj = await getUserFromDBbyEmail(formdata?.get("email"));
      if (currentUserObj?.success) {
        toast.error("User already exists. Please Log in", {
          duration: 2000,
        });
        setIsSigning(false);
      }
      //Functiion to create the user after checking if it doesnt exists
      else {
        const userCreatedObj = await createuserinDb(formdata);
        setIsSigning(false);
        console.log("THIS CAME", userCreatedObj);
        router.push(`/signup?signUp=${userCreatedObj?.userData?.id}`);
      }
    }
  }

  return (
    <form
      className="space-y-4 text-sm text-gray-700"
      onSubmit={async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        await handleAction(formdata);
      }}
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="name">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
        />
      </div>

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
              setDob({
                ...dob,
                month: e.target.value.replace(/\D/g, ""),
              })
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
              setDob({
                ...dob,
                year: e.target.value.replace(/\D/g, ""),
              })
            }
            className="border border-gray-300 rounded-md px-3 py-1.5 text-center focus:outline-[#1D6FAA]"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="Choose a secure password"
          className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA]"
        />
      </div>

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
      <div className="flex flex-col space-y-1">
        <label htmlFor="address">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          rows={2}
          placeholder="Your full address"
          className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-[#1D6FAA] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSigning}
        className={
          !isSigning
            ? `w-full bg-[#1D6FAA] hover:bg-[#174e87] text-white font-semibold rounded-md py-2 transition duration-300`
            : `w-full bg-[#71a1c4] text-white font-semibold rounded-md py-2 transition duration-300`
        }
      >
        {!isSigning ? (
          <div className="flex items-center justify-center gap-2">
            Sign in <HiArrowNarrowRight size={18} />
          </div>
        ) : (
          <span>Wait</span>
        )}
      </button>
    </form>
  );
}
