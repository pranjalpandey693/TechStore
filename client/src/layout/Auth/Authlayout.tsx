import ResponsiveSlideAnimation from "@/components/SlideAnimaton";
import { AuthSlideAnimatonImages } from "@/constant/images";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <div className="relative inset-0 flex items-center justify-center min-h-screen  bg-white overflow-hidden">
      <div className="absolute flex items-center inset-0 z-10">
        <ResponsiveSlideAnimation images={AuthSlideAnimatonImages} type="continuous" />
      </div>

      <div className=" relative z-20 w-full max-w-md  px-8  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Authlayout;
