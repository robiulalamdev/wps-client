import { useEffect, useState } from "react";
import MainHeader from "../../components/shared/headers/MainHeader";
import { useGetWallpapersByTagQuery } from "../../redux/features/wallpapers/wallpapersApi";
import LazyWallpaper from "../../components/common/wallpaper/LazyWallpaper";
import { iImageGallery, iTagViewEye } from "../../utils/icons/icons";
import ErrorPageMain from "../../components/common/errorPages/ErrorPageMain";
import PageLoading from "../../components/common/loadings/PageLoading";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

const TagDetails = () => {
  const router = useRouter();
  const tag = router?.query?.tag;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWallpapers, setTotalWallpapers] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [wallpapers, setWallpapers] = useState([]);
  const [singleWallpaper, setSingleWallpaper] = useState(null);
  const [tags, setTags] = useState([]);
  const { data, isLoading } = useGetWallpapersByTagQuery({
    tag: tag,
    page: currentPage,
  });

  const limit = 18;

  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      if (currentPage === 1) {
        setSingleWallpaper(data?.data?.data[0]);
        const items = [...data.data.data];
        items.shift();
        setWallpapers(items);
        setTotalViews(data?.data?.totalView);
        setTotalWallpapers(data?.data?.totalWallpapers);
        if (data?.data?.relatedTags?.length > 0) {
          setTags(data?.data?.relatedTags?.slice(0, 10));
        }
      }
      if (currentPage > 1) {
        setWallpapers((prevWallpapers) => [
          ...prevWallpapers,
          ...data.data.data,
        ]);
      }
    }
  }, [data?.data]);

  return (
    <div className="min-h-screen">
      <MainHeader />
      {data?.data?.data?.length < 1 && currentPage === 1 && !isLoading && (
        <ErrorPageMain showHeader={false} />
      )}
      {isLoading && <PageLoading />}

      {data?.data?.data?.length > 0 && !isLoading && (
        <>
          <div className="flex flex-col md:flex-row md:justify-between w-full items-start gap-x-[11px] gap-y-[6px]">
            <div
              onClick={() => router.push(`/w/${singleWallpaper?.slug}`)}
              className="max-w-[999px] w-full h-[151px] max-h-[151px] md:h-[543px] md:max-h-[543px] relative rounded-[5px] md:rounded-[10px]"
            >
              <LazyWallpaper
                src={singleWallpaper?.wallpaper}
                alt={singleWallpaper?.wallpaper}
                maxWidth={999}
                maxHeight={543}
                width={999}
                height={543}
                className="w-full h-full cursor-pointer rounded-[5px] md:rounded-[10px] object-cover"
              />
            </div>
            <div
              className="w-full md:w-[698px] md:max-w-[698px] md:h-[543px] md:max-h-[543px] min-h-[125px] rounded-[10px] px-[13px] md:px-[52px] pt-[4px] md:pt-[16px]"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
            >
              <h1 className="text-[15px] md:text-[30px] font-bakbak-one font-normal leading-normal text-white text-center">
                Tag: <span className="text-[#B3FD16]"> #{tag}</span>
              </h1>

              <div className="mt-[13px] md:mt-[46px] flex flex-row justify-center items-center md:items-start md:justify-start gap-x-[11px] md:flex-col gap-y-[41px]">
                <div className="flex items-center gap-x-[12px]">
                  <div className="size-[15px] md:size-[30px]">
                    {iImageGallery}
                  </div>
                  <h1 className="text-white text-[12px] md:text-[20px] font-normal font-bakbak-one leading-normal">
                    {totalWallpapers}
                  </h1>
                </div>
                <div className="flex items-center gap-x-[12px]">
                  <div className="size-[15px] md:size-[30px]">
                    {iTagViewEye}
                  </div>
                  <h1 className="text-white text-[12px] md:text-[20px] font-normal font-bakbak-one leading-normal">
                    {totalViews}
                  </h1>
                </div>
              </div>
              <h1 className="font-bakbak-one text-[#939393] text-[12px] md:text-[20px] break-words font-normal leading-normal mt-[13px] md:mt-[39px]">
                Related Tags:{" "}
                {tags?.map((item, index) => (
                  <span
                    key={index}
                    className="text-[10px] md:text-[14px] text-white hover:text-[#FDF516] cursor-pointer"
                  >
                    <a href={`/tags/${item}`}>#{item}</a>{" "}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          {wallpapers.length > 0 && (
            <>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-[14px] gap-y-[14px] md:gap-x-[16px] md:gap-y-[32px] lg:gap-x-[40px] lg:gap-y-[59px] mt-[18px] md:mt-[53px]">
                {wallpapers?.map((item, index) => (
                  <div
                    onClick={() => router.push(`/w/${item?.slug}`)}
                    key={index}
                    className={`w-full h-[152px] md:h-[138px] rounded-[5px] md:rounded-[7px] lg:rounded-[10px] overflow-hidden relative`}
                  >
                    <LazyWallpaper
                      src={item?.wallpaper}
                      alt={item?.wallpaper}
                      maxWidth={400}
                      maxHeight={300}
                      width={400}
                      height={300}
                      className="w-full h-full rounded-[5px] md:rounded-[7px] lg:rounded-[10px] object-cover hover:scale-110 duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {currentPage * limit < data?.data?.meta?.total && (
                <div
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-[#000000] w-[128px] h-[42px] rounded-[100px] mx-auto mt-[27px] md:mt-[40px] flex justify-center items-center font-bakbak-one text-[12px] text-[#CCC] cursor-pointer"
                >
                  View more
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TagDetails;

TagDetails.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
