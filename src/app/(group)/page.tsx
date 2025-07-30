import HeaderComponent from "../components/header";
import AllPostsComponent from "../components/post-components/allposts";
import UploadPost from "../components/post-components/upload_post";
import SideProfileTab from "../components/sideProfileTab";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center pt-4 gap-6 bg-[#F4F2EE] relative">
      <div className="w-full fixed top-0 z-10">
        <HeaderComponent />
      </div>
      <div className="flex flex-col gap-4 h-full min-h-60 w-[15%] bg-[#F1EFEC] sticky top-18 rounded-lg shadow-[1px_1px_3px_rgb(0,0,0,0.9)] overflow-hidden">
        <SideProfileTab />
      </div>
      <div className="min-h-screen  flex flex-col  shrink w-[37%]  ">
        <UploadPost />
        <hr className="bg-[#bbb8b4] m-4 h-[2px]" />
        <AllPostsComponent />
      </div>
      <div className=" flex flex-wrap shrink w-[20%] min-h-10 h-80  bg-pink-500 sticky top-18"></div>
    </div>
  );
}
