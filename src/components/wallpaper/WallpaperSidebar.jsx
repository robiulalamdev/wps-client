/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Drawer } from "@material-tailwind/react";
import WallpaperSidebarUi from "./WallpaperSidebarUi";

const WallpaperSidebar = ({ open, setOpen, data }) => {
  return (
    <>
      <div className="hidden lg:block">
        <WallpaperSidebarUi data={data} />
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={361}
        className="bg-transparent p-0 m-0 w-full"
      >
        <WallpaperSidebarUi data={data} />
      </Drawer>
    </>
  );
};

export default WallpaperSidebar;
