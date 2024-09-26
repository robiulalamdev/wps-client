import { useRouter } from "next/router";
import { iUploadUp } from "../../utils/icons/icons";

const VaultEmpty = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-[32px] md:gap-y-[61px] mt-[80px] md:mt-[183px]">
        <h1 className="text-center font-bakbak-one text-[#FFF] text-[12px] md:text-[20px]">
          Your vault is currently empty
        </h1>
        <div
          onClick={() => router.push("/upload")}
          className={`bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] text-[#C4C4C4] text-[15px] font-bakbak-one flex justify-center items-center cursor-pointer gap-[5px]`}
        >
          Upload {iUploadUp}
        </div>
      </div>
    </>
  );
};

export default VaultEmpty;
