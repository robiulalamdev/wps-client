/* eslint-disable react/prop-types */
import { Dialog } from "@material-tailwind/react";

const VerifyModal = ({ title, open, setOpen }) => {
  return (
    <Dialog
      open={open}
      handler={() => {
        setOpen(false);
      }}
      size="xs"
      className="px-4 sm:p-0 bg-[#2D2D2D] max-w-[300px] w-full min-h-[282px] relative flex flex-col justify-center items-center gap-4"
    >
      <div className="max-w-[300px] mx-auto w-full pb-[15px]">
        <p className="text-[#FFF] text-center text-[12px] font-bakbak-one">
          {title}
        </p>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="w-[100px] h-[37px] bg-[#202020] rounded-[10px] text-[#FFF] text-[12px] font-bakbak-one mx-auto mt-[15px] block"
        >
          Ok
        </button>
      </div>
    </Dialog>
  );
};

export default VerifyModal;
