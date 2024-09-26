import { useContext, useMemo, useState } from "react";
import RulesHeader from "../../components/shared/headers/RulesHeader";
import { Button } from "@material-tailwind/react";
import AccountSettingProfileTab from "../../components/account-settings/AccountSettingProfileTab";
import AccountSettingBrandTab from "../../components/account-settings/AccountSettingBrandTab";
import AccountSettingCredentialTab from "../../components/account-settings/AccountSettingCredentialTab";
import AccountSettingPrivacyTab from "../../components/account-settings/AccountSettingPrivacyTab";
import AccountSettingWallpaperTab from "../../components/account-settings/AccountSettingWallpaperTab";
import { AuthContext } from "../../contextApi/AuthContext";
import { ROLE_DATA } from "../../lib/config";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/middlewares/PrivateRoute";

const tabs = [
  { id: 1, name: "Profile" },
  { id: 3, name: "Credentials" },
  { id: 4, name: "Privacy" },
  { id: 5, name: "Wallpapers" },
];

const AccountSettings = () => {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(1);

  useMemo(() => {
    if (
      user &&
      user?.verification_status === true &&
      user?.role === ROLE_DATA.BRAND
    ) {
      !tabs.find((t) => t.id === 2) &&
        tabs.splice(1, 0, { id: 2, name: "Brand" });
    }
  }, [user]);
  return (
    <>
      <RulesHeader />
      <div className="acs-container">
        <h1 className="text-[15px] md:text-[25px] text-center font-bakbak-one text-[#FFF] mb-[15px] md:mb-[33px]">
          Account Settings
        </h1>
        <div className="border-t-[1px] border-[#5A5A5A] w-full mb-[19px] md:mb-[17px]"></div>
        <div className="overflow-x-auto w-fit mx-auto">
          <div className="bg-[#00000033] rounded-[100px] max-w-fit w-full h-[45px] mx-auto flex justify-between items-center px-[8px] gap-[10px]">
            {tabs.map((t, i) => (
              <Button
                onClick={() => setSelectedTab(t.id)}
                key={i}
                className={`hover:shadow-none shadow-none py-0 m-0 normal-case font-lato text-[10px] sm:text-[12px] leading-[14.4px] font-bold md:min-w-[59px] w-fit px-2 h-[33px] ${
                  selectedTab === t.id
                    ? "bg-[#DD2E44] !text-[#fff] rounded-[100px]"
                    : "bg-transparent !text-[#fff]"
                }`}
              >
                {t.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full h-full min-h-[780px] max-h-fit md:bg-black/20 md:rounded-[10px] md:mt-[16px]">
          {selectedTab === 1 && <AccountSettingProfileTab />}
          {selectedTab === 2 && <AccountSettingBrandTab />}
          {selectedTab === 3 && <AccountSettingCredentialTab />}
          {selectedTab === 4 && <AccountSettingPrivacyTab />}
          {selectedTab === 5 && <AccountSettingWallpaperTab />}
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(AccountSettings, MainLayout);
