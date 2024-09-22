import Link from "next/link";

const AuthContainerFooterLinks = () => {
  return (
    <>
      <Link
        href="/community-rules"
        className="text-[9px] sm:text-[10px] md:text-[12px] font-roboto font-medium text-[#373737] outline-none inline"
      >
        Community Rules
      </Link>
      <Link
        href="/privacy-policy"
        className="text-[9px] sm:text-[10px] md:text-[12px] font-roboto font-medium text-[#373737] outline-none inline"
      >
        Privacy Policy
      </Link>
      <Link
        href="/terms-and-conditions"
        className="text-[9px] sm:text-[10px] md:text-[12px] font-roboto font-medium text-[#373737] outline-none inline"
      >
        Terms and Conditions
      </Link>
    </>
  );
};

export default AuthContainerFooterLinks;
