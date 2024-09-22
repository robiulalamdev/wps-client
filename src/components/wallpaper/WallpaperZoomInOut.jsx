/* eslint-disable react/prop-types */
import { useControls } from "react-zoom-pan-pinch";
import { IZoom_In, IZoom_Out } from "../../utils/icons/icons";

const WallpaperZoomInOut = ({ user = null }) => {
  const { zoomIn, zoomOut } = useControls();
  return (
    <div
      className={`w-[35px] h-fit py-[12px] absolute ${
        user
          ? "top-[70px] right-[26px]"
          : "top-[20px] right-[20px] lg:top-[30px] lg:right-[30px]"
      } rounded-[5px] z-10 
      md:hidden group-focus:block group-hover:block`}
      style={{ background: "rgba(0, 0, 0, 0.60)" }}
    >
      <div className="flex flex-col justify-center items-center gap-[18px]">
        <div
          onClick={() => zoomIn()}
          className="text-white w-[20px] hover:text-primary cursor-pointer"
        >
          {IZoom_In}
        </div>
        <div
          onClick={() => zoomOut()}
          className="text-white w-[20px] hover:text-primary cursor-pointer"
        >
          {IZoom_Out}
        </div>
      </div>
    </div>
  );
};

export default WallpaperZoomInOut;
