/* eslint-disable react/prop-types */

import DraftPublishSidebarUi from "./DraftPublishSidebarUi";
import { Drawer } from "@material-tailwind/react";

const DraftPublishSidebar = ({
  open,
  setOpen,
  selectedImages,
  resetSelect,
  items,
  currentTab,
}) => {
  return (
    <>
      <div className="hidden lg:block">
        <DraftPublishSidebarUi
          setOpen={setOpen}
          selectedImages={selectedImages}
          resetSelect={resetSelect}
          items={items}
          currentTab={currentTab}
        />
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={300}
        className="p-0 bg-transparent rounded-[10px] overflow-y-auto"
      >
        <DraftPublishSidebarUi
          setOpen={setOpen}
          selectedImages={selectedImages}
          resetSelect={resetSelect}
          items={items}
          currentTab={currentTab}
        />
      </Drawer>
    </>
  );
};

export default DraftPublishSidebar;
