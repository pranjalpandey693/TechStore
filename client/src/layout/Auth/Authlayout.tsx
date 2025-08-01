import ShrinkingCarousel from "@/views/Auth/components/Carousel";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen  bg-white overflow-hidden">
      <div className="absolute flex items-center inset-0 z-10">
        <ShrinkingCarousel />

      </div>
      <div className=" relative z-20 w-full max-w-md  p-8  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Authlayout;
