/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import MediaCenterSidebarUi from "./MediaCenterSidebarUi";
import { Drawer } from "@material-tailwind/react";
import { iBack } from "../../utils/icons/icons";

const MediaCenterSidebar = ({
  open,
  setOpen,
  tab,
  setTab,
  items,
  selectedItems,
  resetSelect,
}) => {
  return (
    <>
      <div className="max-w-[295px] min-w-[295px] w-full rounded-[10px] bg-black/20 h-[620px] hidden lg:block">
        <MediaCenterSidebarUi
          open={open}
          onClose={setOpen}
          tab={tab}
          setTab={setTab}
          items={items}
          selectedItems={selectedItems}
          resetSelect={resetSelect}
        />
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={361}
        className="bg-[#121212] p-0"
      >
        <div className="pt-[60px] px-0 relative">
          <div
            onClick={() => setOpen(false)}
            className="absolute top-[18px] right-[25px]"
          >
            {iBack}
          </div>
          <MediaCenterSidebarUi
            open={open}
            onClose={setOpen}
            tab={tab}
            setTab={setTab}
            items={items}
            selectedItems={selectedItems}
            resetSelect={resetSelect}
          />
        </div>
      </Drawer>
    </>
  );
};

export default MediaCenterSidebar;
