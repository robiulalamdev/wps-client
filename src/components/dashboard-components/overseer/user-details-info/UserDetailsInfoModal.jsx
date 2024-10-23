/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { idashClose } from "../../../../utils/icons/dashboard-icons/dashicons";
import LoginInfoTab from "./LoginInfoTab";
import useViewImage from "../../../../lib/hooks/useViewImage";
import { DefaultProfile } from "../../../../lib/data/globalData";
import UserProfileSettingsTab from "./UserProfileSettingsTab";
import UserProfileInformationTab from "./UserProfileInformationTab";
import UserPrivilegesTab from "./UserPrivilegesTab";

const tabs = [
  { id: 1, name: "Login Information" },
  { id: 2, name: "Profile Settings" },
  { id: 3, name: "Profile Information" },
  { id: 4, name: "Privileges" },
];
const UserDetailsInfoModal = ({ open, onClose }) => {
  const [user, setUser] = useState(null);
  const { viewResizeImg } = useViewImage();
  const [tab, setTab] = useState(1);

  // console.log(open);

  useEffect(() => {
    if (open?._id) {
      setUser(open);
    }
  }, [open]);
  return (
    <Dialog
      open={!!open?._id}
      className="bg-transparent border-none p-0 outline-none flex justify-center items-center w-full h-full"
    >
      <div className="min-w-[715px] max-w-[715px] min-h-[700px]  rounded-[10px] bg-[#D5D5D5] relative pr-[32px] pl-[9px] overflow-y-auto">
        <div className="flex justify-between w-full h-full">
          <div className="min-w-[170px] max-w-[170px] min-h-[700px] pr-[16px] h-full border-r-[1px] border-[#ACACAC]">
            <div className="size-[87px] rounded-full bg-[#00000080] flex justify-center items-center mt-[33px] mx-auto">
              <img
                src={
                  viewResizeImg(open?.profile?.profile_image, 85, 85) ||
                  DefaultProfile
                }
                alt=""
                className="size-[75px] rounded-full object-cover"
              />
            </div>
            <div className="mt-[33px] grid grid-cols-1 gap-[28px]">
              {tabs.map((item, index) => (
                <Button
                  onClick={() => setTab(item.id)}
                  key={index}
                  className={`normal-case outline-none shadow-none text-left hover:shadow-none w-full h-[39px] rounded-[5px] py-0 pl-[18px] pr-0 
                  ${
                    tab === item.id
                      ? "text-white bg-[#313131]"
                      : "bg-transparent text-[#313131]"
                  }
                  `}
                >
                  <h1 className="font-lato text-[15px] font-medium leading-normal">
                    {item.name}
                  </h1>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-grow relative w-full h-full min-h-[700px]">
            {tab === 1 && <LoginInfoTab user={user} setUser={setUser} />}
            {tab === 2 && (
              <UserProfileSettingsTab user={user} setUser={setUser} />
            )}
            {tab === 3 && (
              <UserProfileInformationTab user={user} setUser={setUser} />
            )}
            {tab === 4 && <UserPrivilegesTab user={user} setUser={setUser} />}
          </div>
        </div>
        <div
          onClick={onClose}
          className="absolute top-[19px] right-[27px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default UserDetailsInfoModal;
