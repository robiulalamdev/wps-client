import RulesHeader from "../../components/shared/headers/RulesHeader";
import bg from "../../assets/images/social/bg.png";

import img1 from "../../assets/images/social/s1.png";
import img2 from "../../assets/images/social/s2.png";
import img3 from "../../assets/images/social/s3.png";
import img4 from "../../assets/images/social/s4.png";
import img5 from "../../assets/images/social/s5.png";
import MainLayout from "@/layouts/MainLayout";

const Socials = () => {
  return (
    <>
      <RulesHeader />
      <div>
        <h1 className="text-center font-bakbak-one text-[15px] md:text-[25px] text-white">
          Socials
        </h1>

        <div className="border-t-[1px] border-[#5A5A5A] w-full mt-[14px] mb-[15px] md:mt-[23px] md:mb-[23px]"></div>
        <div
          className="md:h-[294px] w-full rounded-[5px] hidden md:block"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${bg.src})`,
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="h-[133px] w-full rounded-[5px] md:hidden"
          style={{
            background: `url(${bg.src})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="mt-[30px] md:mt-[36px] grid grid-cols-3 gap-x-[7px] gap-y-[28px] md:gap-x-[25px] md:gap-y-[36px]">
          <div className="h-[72px] w-full md:h-[210px] rounded-[10px] md:rounded-[5px] overflow-hidden">
            <img
              src={img1.src}
              alt="social image"
              className="w-full h-full hover:scale-110 duration-300 cursor-pointer object-cover rounded-[10px] md:rounded-[5px]"
            />
          </div>
          <div className="h-[72px] w-full md:h-[210px] rounded-[10px] md:rounded-[5px] overflow-hidden">
            <img
              src={img2.src}
              alt="social image"
              className="w-full h-full hover:scale-110 duration-300 cursor-pointer object-cover rounded-[10px] md:rounded-[5px]"
            />
          </div>
          <div className="h-[72px] w-full md:h-[210px] rounded-[10px] md:rounded-[5px] overflow-hidden">
            <img
              src={img3.src}
              alt="social image"
              className="w-full h-full hover:scale-110 duration-300 cursor-pointer object-cover rounded-[10px] md:rounded-[5px]"
            />
          </div>
          <div className="h-[72px] w-full md:h-[210px] rounded-[10px] md:rounded-[5px] overflow-hidden">
            <img
              src={img4.src}
              alt="social image"
              className="w-full h-full hover:scale-110 duration-300 cursor-pointer object-cover rounded-[10px] md:rounded-[5px]"
            />
          </div>
          <div className="h-[72px] w-full md:h-[210px] rounded-[10px] md:rounded-[5px] overflow-hidden">
            <img
              src={img5.src}
              alt="social image"
              className="w-full h-full hover:scale-110 duration-300 cursor-pointer object-cover rounded-[10px] md:rounded-[5px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Socials;

Socials.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};