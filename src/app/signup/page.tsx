import Image from "next/image";
import Link from "next/link";
import UserDetailsForm from "../components/signup/userDetailsForm";
import OptionalForm from "../components/signup/optionalForm";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { signUp: string };
}) {
  const signedIn = searchParams.signUp;
  console.log(signedIn);
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
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 overflow-hidden">
          <h2 className="text-xl font-semibold text-[#1D6FAA] mb-6 tracking-wide">
            Create an Account
          </h2>
          {!signedIn ? (
            <UserDetailsForm />
          ) : (
            <OptionalForm signUp={searchParams.signUp} />
          )}

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
