import RulesHeader from "../../components/shared/headers/RulesHeader";
import AccountVerificationBrandTab from "../../components/account-verification/AccountVerificationBrandTab";
import { useContext, useMemo, useState } from "react";
import AccountVerificationSuccess from "../../components/account-verification/AccountVerificationSuccess";
import { AuthContext } from "../../contextApi/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import VerifyApprovedPrivateRoute from "@/middlewares/VerifyApprovedPrivateRoute";

const AccountVerification = () => {
  const { user } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  useMemo(() => {
    if (user && user?.verification?.status === "Pending") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [user]);

  return (
    <>
      <RulesHeader />
      <div className="">
        <h1 className="text-[15px] md:text-[25px] text-center font-bakbak-one text-[#FFF] mb-[15px] md:mb-[33px]">
          Request Verification
        </h1>

        <div className="border-t-[1px] border-[#5A5A5A] w-full mb-[13px] md:mb-[30px]"></div>

        <div className="w-full h-full min-h-[780px] max-h-fit md:bg-black/20 md:rounded-[10px] md:mt-[16px]">
          {success ? (
            <AccountVerificationSuccess />
          ) : (
            <AccountVerificationBrandTab
              success={success}
              setSuccess={setSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyApprovedPrivateRoute(AccountVerification, MainLayout);
