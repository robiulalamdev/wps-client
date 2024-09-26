import { Button } from "@material-tailwind/react";
import Link from "next/link";

const AccountVerificationSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[780px] gap-5 w-full h-full">
      <div className="max-w-[715px] mx-auto">
        <p className="text-[#fff] text-[12px] md:text-[15px] text-center font-bakbak-one leading-normal">
          Thank you for initiating the verification process. Please be aware
          that all verification procedures are subject to manual review, and
          additional verification may be necessary to confirm the identity of
          the requester. In the event further information is needed, we will
          contact you via email.
        </p>
      </div>
      <Link href="/">
        <Button className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto mt-[23px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] block p-0">
          Home
        </Button>
      </Link>
    </div>
  );
};

export default AccountVerificationSuccess;
