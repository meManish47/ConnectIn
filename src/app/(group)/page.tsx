import HeaderComponent from "../components/header";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center pt-4 gap-6 bg-[#D4C9BE] relative">
      <div className="w-full fixed top-0 z-10">
        <HeaderComponent />
      </div>
      <div className="flex flex-col gap-4 h-full min-h-20 w-[15%] bg-amber-300 sticky top-18"></div>
      <div className="min-h-screen h-800 flex flex-wrap shrink w-[37%] bg-blue-500 "></div>
      <div className=" flex flex-wrap shrink w-[20%] min-h-10 h-80  bg-pink-500 sticky top-18"></div>
    </div>
  );
}
