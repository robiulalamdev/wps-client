/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog } from "@material-tailwind/react";
import React, { useState } from "react";
import {
  iDashUserForChagnePass,
  idashClose,
  idashPass,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useRemoveUserByIdsMutation } from "../../../redux/features/users/usersApi";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";

const UserAccountDeletionModal = ({ open, onClose, handleRemoveUsers }) => {
  const [success, setSuccess] = useState(false);
  const [removeUserByIds, { isLoading }] = useRemoveUserByIdsMutation();

  const handleDelete = async (items = []) => {
    if (items?.length > 0) {
      const ids = await items?.map((item) => item?._id);
      const options = {
        data: { ids: ids },
      };

      const result = await removeUserByIds(options);
      if (result?.data?.success) {
        setSuccess(true);
      } else {
        toast.error("User deleted unSuccessful");
      }
    }
  };

  const handleClose = () => {
    onClose();
    setSuccess(false);
  };

  return (
    <Dialog
      open={!!open?._id}
      size="md"
      className="bg-transparent p-0 outline-none flex justify-center items-center"
    >
      <div className="min-w-[398px] max-w-[398px] min-h-[344px] max-h-fit bg-[#D5D5D5] rounded-[10px] px-[23px] pt-[29px] pb-[17px] relative">
        {!success && (
          <>
            <h1 className="font-lato text-[18px] font-bold leading-normal text-[#313131] text-center">
              Account Deletion
            </h1>

            <div className="flex items-center justify-center gap-x-[11px] mt-[27px] mb-[7px]">
              {iDashUserForChagnePass}
              <h1 className="font-lato text-[18px] font-bold leading-normal text-[#313131] text-center">
                {open?.username}
              </h1>
            </div>

            <svg
              width="355"
              height="2"
              viewBox="0 0 355 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1H354" stroke="#C8C8C8" stroke-linecap="round" />
            </svg>

            <Button
              disabled={isLoading}
              onClick={() => handleDelete([open])}
              className="w-[88px] h-[36px] mt-[78px] shadow-none hover:shadow-none normal-case bg-[#FF0000D4] rounded-[5px] text-[15px] font-lato text-white leading-normal font-medium p-0 block mx-auto flex justify-center items-center gap-x-[3px]"
            >
              {isLoading && (
                <SpinnerCircularFixed
                  size={16}
                  thickness={180}
                  speed={350}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(255, 255, 255, 0.42)"
                />
              )}{" "}
              Delete
            </Button>

            <p className="mt-[51px] text-[#FF0000] text-[10px] font-lato font-medium leading-normal text-center">
              This action is permanent.
            </p>
          </>
        )}

        {success && (
          <div className="flex justify-center items-center w-full h-full min-h-[300px]">
            <p className="text-black text-[15px] font-lato font-medium leading-normal text-center">
              User has been successfully deleted.
            </p>
          </div>
        )}

        <div
          onClick={() => handleClose()}
          className="absolute top-[14px] right-[13px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default UserAccountDeletionModal;
