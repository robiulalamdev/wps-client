/* eslint-disable no-unused-vars */
import { Button } from "@material-tailwind/react";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../contextApi/AuthContext";
import { useSettingsChangeMutation } from "../../redux/features/users/usersApi";
import { SpinnerCircularFixed } from "spinners-react";

const AccountSettingPrivacyTab = () => {
  const { user } = useContext(AuthContext);
  const [settingsChange, { isLoading }] = useSettingsChangeMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [profileVisiblity, setProfileVisiblity] = useState("Visible");
  const [message, setMessage] = useState("Enabled");

  const handleInfoUpdate = async () => {
    const data = {
      profile_visibility: profileVisiblity === "Visible" ? true : false,
      messaging: message === "Enabled" ? true : false,
    };
    const options = {
      data: data,
    };
    const result = await settingsChange(options);
    if (result?.data?.success) {
      console.log(result);
    } else {
      if (result?.data?.type === "email") {
        setErrorMessage(result?.data?.message);
      }
    }
    if (result?.error?.data?.type === "email") {
      setErrorMessage(result?.error?.data?.message);
    }
  };

  useMemo(() => {
    if (user) {
      setProfileVisiblity(
        user?.settings?.profile_visibility ? "Visible" : "Hidden"
      );
      setMessage(user?.settings?.messaging ? "Enabled" : "Disabled");
    }
  }, [user]);
  return (
    <div>
      <div className="pt-[43px] w-full mx-auto">
        <h1 className="text-[15px] font-lato text-center text-[#FFF]">
          Profile Visibility
        </h1>
        <div className="bg-[#00000033] rounded-[100px] w-[172px] h-[45px] flex justify-between items-center px-[8px] mt-[29px] mx-auto">
          {["Visible", "Hidden"].map((t, i) => (
            <Button
              onClick={() => setProfileVisiblity(t)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[72px] h-[32px] ${
                profileVisiblity === t
                  ? `${
                      profileVisiblity === "Visible"
                        ? "bg-[#0AB745]"
                        : "bg-[#B70A0A]"
                    } !text-white rounded-[100px]`
                  : "bg-transparent !text-[#C6C6C6]"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>
        {profileVisiblity === "Hidden" && (
          <p className="text-center font-normal text-[12px] font-lato leading-normal text-[#939393] mt-[24px]">
            All uploads will remain public. However, your favorites,
            collections, and other profile information will be hidden from the
            public.
          </p>
        )}
      </div>
      <div className="pt-[39px] w-full mx-auto">
        <h1 className="text-[15px] font-lato text-center text-[#FFF]">
          Messaging
        </h1>

        <div className="bg-[#00000033] rounded-[100px] w-[172px] h-[45px] flex justify-between items-center px-[8px] mt-[29px] mx-auto">
          {["Enabled", "Disabled"].map((t, i) => (
            <Button
              onClick={() => setMessage(t)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[72px] h-[32px] ${
                message === t
                  ? `${
                      message === "Enabled" ? "bg-[#0AB745]" : "bg-[#B70A0A]"
                    } !text-white rounded-[100px]`
                  : "bg-transparent !text-[#C6C6C6]"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>
        {message === "Disabled" && (
          <p className="text-center font-normal text-[12px] font-lato leading-normal text-[#939393] mt-[24px]">
            You will be unable to receive messages from regular users, and the
            ability to send messages will also be disabled. However, <br />
            administrators and moderators will retain the capability to contact
            you through our messaging system.
          </p>
        )}
      </div>

      <Button
        onClick={() => handleInfoUpdate()}
        disabled={isLoading}
        className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto mt-[85px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 flex items-center justify-center gap-2"
      >
        {isLoading && (
          <SpinnerCircularFixed
            size={20}
            thickness={180}
            speed={300}
            color="rgba(255, 255, 255, 1)"
            secondaryColor="rgba(255, 255, 255, 0.42)"
          />
        )}{" "}
        Save
      </Button>

      <div className="border-t-[1px] border-[#5A5A5A] mt-[56px] md:mt-[93px] mb-[33px] md:mb-[64px] w-full max-w-[1200px] mx-auto"></div>

      <h1 className="text-[15px] font-lato text-center text-[#FFF]">
        Delete Account
      </h1>
      <Button className="font-normal normal-case bg-[#FF0000] w-[129px] h-[38px] rounded-[5px] mx-auto mt-[29px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] block p-0">
        Delete
      </Button>

      <p className="text-center font-normal text-[12px] font-lato leading-normal text-[#939393] mt-[29px]">
        Please be aware that account deletion is a permanent action, and it will
        result in the complete erasure of all your data from our servers.
      </p>
    </div>
  );
};

export default AccountSettingPrivacyTab;
