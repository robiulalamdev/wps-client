import { Button } from "@material-tailwind/react";
// import img1 from "../../../assets/images/home/official-wellpaper/wimg1.png";
// import img2 from "../../../assets/images/home/official-wellpaper/wimg2.png";
// import img3 from "../../../assets/images/home/official-wellpaper/wimg3.png";
// import { useGetOfficialWallpapersQuery } from "../../../redux/features/wallpapers/wallpapersApi";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useRouter } from "next/router";
import { useGetOfficialSponsorsDataQuery } from "@/redux/features/sponsor/sponsorApi";
import LazyWallpaper from "@/components/common/wallpaper/LazyWallpaper";

const OfficialWallpapers = () => {
  const { viewResizeImg } = useViewImage();
  const { data } = useGetOfficialSponsorsDataQuery();
  const router = useRouter();

  // console.log(data);

  return (
    <>
      {data?.data?.length === 3 && (
        <div>
          <h1 className="text-white text-center font-bakbak-one text-[15px] md:text-[35px] leading-[21px] mt-[27px] mb-[24px] md:mt-[103px] md:mb-[58px] font-normal">
            Official Wallpapers
          </h1>
          {/* <div className="md:grid grid-cols-2 gap-x-[36px] hidden md:inline-block">
          <div className="min-h-[335px] max-h-[535px] w-full rounded-[30px] overflow-hidden">
            <Image
              src={img1}
              alt="img"
              className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 gap-y-[30px]">
            <div className="h-[253px] w-full rounded-[30px] overflow-hidden">
              <Image
                src={img2}
                alt="img"
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="h-[253px] w-full rounded-[30px] overflow-hidden">
              <Image
                src={img3}
                alt="img"
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* // sm */}
          {/* <div className="grid grid-cols-2 gap-x-[9px] gap-y-[10px] md:hidden">
          <div className="max-h-[196px] w-full rounded-[12px] overflow-hidden">
            <Image
              src={img2}
              alt="img"
              className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
            />
          </div>
          <div className="max-h-[196px] w-full rounded-[12px] overflow-hidden">
            <Image
              src={img3}
              alt="img"
              className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
            />
          </div>
          <div className="min-h-[131px] max-h-[131px] w-full rounded-[12px] overflow-hidden col-span-2">
            <Image
              src={img1}
              alt="img"
              className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
            />
          </div>
        </div>  */}

          <div className="md:grid grid-cols-2 gap-x-[36px] hidden md:inline-block">
            <div
              onClick={() => router.push(`/w/${data?.data[0]?.slug}`)}
              className={`min-h-[335px] max-h-[535px] w-full rounded-[30px] overflow-hidden relative`}
            >
              <LazyWallpaper
                src={viewResizeImg(data?.data[0]?.wallpaper)}
                alt={viewResizeImg(data?.data[0]?.wallpaper)}
                maxWidth={600}
                maxHeight={535}
                width={600}
                height={460}
                imgWidth=""
                imgHeight=""
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
              {/* {open && <SeenOverlay />} */}
            </div>
            <div className="grid grid-cols-1 gap-y-[30px]">
              <div
                onClick={() => router.push(`/w/${data?.data[1]?.slug}`)}
                className="h-[253px] w-full rounded-[30px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={viewResizeImg(data?.data[1]?.wallpaper)}
                  alt={viewResizeImg(data?.data[1]?.wallpaper)}
                  maxWidth={600}
                  maxHeight={253}
                  width={600}
                  height={460}
                  imgWidth=""
                  imgHeight=""
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
              <div
                onClick={() => router.push(`/w/${data?.data[2]?.slug}`)}
                className="h-[253px] w-full rounded-[30px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={viewResizeImg(data?.data[2]?.wallpaper)}
                  alt={viewResizeImg(data?.data[2]?.wallpaper)}
                  maxWidth={600}
                  maxHeight={253}
                  width={600}
                  height={460}
                  imgWidth=""
                  imgHeight=""
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* // sm */}
          <div className="grid grid-cols-2 gap-x-[9px] gap-y-[10px] md:hidden">
            <div
              onClick={() => router.push(`/w/${data?.data[0]?.slug}`)}
              className="max-h-[196px] w-full rounded-[12px] overflow-hidden relative"
            >
              <LazyWallpaper
                src={viewResizeImg(data?.data[0]?.wallpaper)}
                alt={viewResizeImg(data?.data[0]?.wallpaper)}
                maxWidth={600}
                maxHeight={196}
                width={600}
                height={460}
                imgWidth=""
                imgHeight=""
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div
              onClick={() => router.push(`/w/${data?.data[1]?.slug}`)}
              className="max-h-[196px] w-full rounded-[12px] overflow-hidden relative"
            >
              <LazyWallpaper
                src={viewResizeImg(data?.data[1]?.wallpaper)}
                alt={viewResizeImg(data?.data[1]?.wallpaper)}
                maxWidth={600}
                maxHeight={196}
                width={600}
                height={460}
                imgWidth=""
                imgHeight=""
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div
              onClick={() => router.push(`/w/${data?.data[2]?.slug}`)}
              className="min-h-[131px] max-h-[131px] w-full rounded-[12px] overflow-hidden relative col-span-2"
            >
              <LazyWallpaper
                src={viewResizeImg(data?.data[2]?.wallpaper)}
                alt={viewResizeImg(data?.data[2]?.wallpaper)}
                maxWidth={600}
                maxHeight={131}
                width={600}
                height={460}
                imgWidth=""
                imgHeight=""
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center items-center pt-[22px] md:pt-[46px]">
            <Button
              onClick={() => router.push("/official-brands")}
              className="w-[171px] h-[37px] md:w-[225px] md:h-[49px] shadow-none hover:shadow-none font-lato font-bold !text-white md:!text-[#949494] text-[12px]  md:text-[15px] leading-[14.4px] normal-case p-0 rounded-[100px] bg-[#00000080]"
            >
              More Official Wallpapers
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default OfficialWallpapers;
