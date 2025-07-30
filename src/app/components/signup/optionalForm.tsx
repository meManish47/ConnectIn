//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  getUserFromDBbyEmail,
  updateUserValues,
} from "@/app/actions/prismaActions";
import toast from "react-hot-toast";

export default function OptionalForm({ signUp }) {
  const id = signUp;
  const router = useRouter();
  const [aboutValue, setAboutValue] = useState(null);
  const [gender, setGender] = useState(null);
  async function handleAction() {
    // const currentUserObj = await getUserFromDBbyEmail(currentUserEmail);
    // const id = currentUserObj?.user?.id;
    const user = await updateUserValues(id, gender, aboutValue);
    toast.success("Success", { duration: 1000 });
    router.push("/login");
  }
  function handleLaterClick() {
    toast.success("Wait...", { duration: 1000 });
    router.push("/login");
  }
  return (
    <form
      className="space-y-4 text-sm text-gray-700"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleAction();
      }}
    >
      {/* Full Name */}
      <div className="flex flex-col space-y-1">
        <div className="text-sm font-semibold">Gender </div>
        <div className="flex h-max w-full items-start gap-2 p-2 mb-4  ">
          <RadioGroup
            defaultValue=""
            className="mt-2 flex gap-2"
            name="gender"
            value={gender}
            onValueChange={(val) => setGender(val)}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" id="r1" className="border-black" />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" id="r2" className="border-black" />
              <Label htmlFor="r2">Female</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="prefernot"
                id="r3"
                className="border-black"
              />
              <Label htmlFor="r3">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="about" className="block font-semibold mb-2">
            About
          </Label>
          <textarea
            name="about"
            id="about"
            rows={4}
            placeholder="Tell us about yourself..."
            value={aboutValue}
            onChange={(e) => setAboutValue(e.target.value)}
            className="w-full border border-gray-400 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-between">
        <button
          type="submit"
          onClick={handleLaterClick}
          className="w-[45%] cursor-pointer bg-white hover:bg-[#174e87] text-[#1D6FAA] border-2 border-[#1D6FAA] font-semibold rounded-md py-2 transition duration-300"
        >
          <div className="flex items-center justify-center gap-2">Later</div>
        </button>
        <button
          type="submit"
          className="w-[45%] cursor-pointer bg-[#1D6FAA] hover:bg-[#174e87] text-white   border-2 border-[#1D6FAA] font-semibold rounded-md py-2 transition duration-300"
        >
          <div className="flex items-center justify-center gap-2">
            Sign in <HiArrowNarrowRight size={18} />
          </div>
        </button>
      </div>
    </form>
  );
}
