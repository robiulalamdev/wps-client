import { useEffect, useState } from "react";
import {
  useAddClickThroughMutation,
  useGetMainSponsorsDataQuery,
} from "../../../redux/features/sponsor/sponsorApi";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useRouter } from "next/router";

const Sponsor = () => {
  const { data } = useGetMainSponsorsDataQuery();
  const [addClickThrough] = useAddClickThroughMutation();
  const [items, setItems] = useState([]);
  const router = useRouter();

  const handleClickThrough = async (id) => {
    const options = {
      id: id,
      data: { date: Date.now() },
    };
    await addClickThrough(options);
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      setItems(data?.data);
    }
  }, [data]);
  return (
    <>
      {items?.length > 3 && (
        <div>
          <h1 className="font-bakbak-one text-[15px] md:text-[35px] text-center text-white mt-[38px] mb-[23px] md:mt-[78px] md:mb-[59px]">
            Sponsors
          </h1>

          <div className="md:grid grid-cols-2 gap-x-[36px] lg:gap-x-[50px] hidden md:inline-block">
            <div
              onClick={() => {
                handleClickThrough(items?.[0]?._id);
                router.push(`/profiles/${items?.[0]?.slug}`);
              }}
              className="min-h-[421px] max-h-[421px] w-full rounded-[30px] overflow-hidden relative"
            >
              <LazyWallpaper
                src={items?.[0]?.banner}
                alt=""
                maxWidth={800}
                maxHeight={421}
                width={1000}
                height={600}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 gap-[31px]">
              <div
                onClick={() => {
                  handleClickThrough(items?.[1]?._id);
                  router.push(`/profiles/${items?.[1]?.slug}`);
                }}
                className="h-[195px] w-full rounded-[30px] overflow-hidden col-span-2 relative"
              >
                <LazyWallpaper
                  src={items?.[1]?.banner}
                  alt=""
                  maxWidth={1000}
                  maxHeight={260}
                  width={1000}
                  height={360}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
              <div
                onClick={() => {
                  handleClickThrough(items?.[2]?._id);
                  router.push(`/profiles/${items?.[2]?.slug}`);
                }}
                className="h-[195px] w-full rounded-[30px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={items?.[2]?.banner}
                  alt=""
                  maxWidth={1000}
                  maxHeight={260}
                  width={1000}
                  height={360}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
              <div
                onClick={() => {
                  handleClickThrough(items?.[3]?._id);
                  router.push(`/profiles/${items?.[3]?.slug}`);
                }}
                className="h-[195px] w-full rounded-[30px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={items?.[3]?.banner}
                  alt=""
                  maxWidth={1000}
                  maxHeight={260}
                  width={1000}
                  height={360}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-[8.96px] gap-y-[10px] md:hidden">
            <div
              onClick={() => {
                handleClickThrough(items?.[0]?._id);
                router.push(`/profiles/${items?.[0]?.slug}`);
              }}
              className="min-h-[131px] max-h-[131px] w-full rounded-[12px] overflow-hidden col-span-2"
            >
              <LazyWallpaper
                src={items?.[0]?.banner}
                alt=""
                maxWidth={505}
                maxHeight={230}
                width={505}
                height={330}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div
              onClick={() => {
                handleClickThrough(items?.[1]?._id);
                router.push(`/profiles/${items?.[1]?.slug}`);
              }}
              className="h-[92px] max-w-[196px] rounded-[12px] overflow-hidden"
            >
              <LazyWallpaper
                src={items?.[1]?.banner}
                alt=""
                maxWidth={260}
                maxHeight={160}
                width={360}
                height={260}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div
              onClick={() => {
                handleClickThrough(items?.[2]?._id);
                router.push(`/profiles/${items?.[2]?.slug}`);
              }}
              className="h-[92px] max-w-[196px] rounded-[12px] overflow-hidden"
            >
              <LazyWallpaper
                src={items?.[2]?.banner}
                alt=""
                maxWidth={260}
                maxHeight={160}
                width={360}
                height={260}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div
              onClick={() => {
                handleClickThrough(items?.[3]?._id);
                router.push(`/profiles/${items?.[3]?.slug}`);
              }}
              className="min-h-[131px] max-h-[131px] w-full rounded-[12px] overflow-hidden col-span-2"
            >
              <LazyWallpaper
                src={items?.[3]?.banner}
                alt=""
                maxWidth={505}
                maxHeight={230}
                width={505}
                height={330}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sponsor;
