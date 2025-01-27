/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import TitleHeader from "../../components/shared/headers/TitleHeader";
import SearchWallpapersSearchInput from "../../components/SearchWallpapers/SearchWallpapersSearchInput";
import SearchWallpapersTabs from "../../components/SearchWallpapers/SearchWallpapersTabs";
import { useContext, useEffect, useMemo, useState } from "react";
import SearchWallpaperNsfwAria from "../../components/SearchWallpapers/SearchWallpaperNsfwAria";
import { useGetSearchAndFilterWallpapersQuery } from "../../redux/features/wallpapers/wallpapersApi";
import PageLoading from "../../components/common/loadings/PageLoading";
import { AuthContext } from "../../contextApi/AuthContext";
import { makeQuery } from "../../lib/services/service";
import NoData from "../../components/common/notFound/NoData";
import SingleSearchWallpaper from "../../components/SearchWallpapers/SingleSearchWallpaper";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

const SearchWallpapers = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [meta, setMeta] = useState({ page: 1, limit: 60, total: 0 });

  const search = router?.query?.search;
  const tn = router?.query?.tn || "Trending";
  const type = router?.query?.type;
  const classification = router?.query?.classification;
  const height = router?.query?.height;
  const width = router?.query?.width;
  const screen_type = router?.query?.screen_type || "";
  const sort_by = router?.query?.sort_by;
  const date = router?.query?.date;
  const tag = router?.query?.tag;
  const name = router?.query?.name;

  const queries = `${search ? `search=${search}&` : ""}${
    tn ? `tn=${tn}&` : ""
  }${type ? `type=${type}&` : ""}${`classification=${
    classification || "SFW"
  }&`}${width && height ? `width=${width}&height=${height}&` : ""}${
    screen_type ? `screen_type=${screen_type}&` : ""
  }${sort_by ? `sort_by=${sort_by}&` : ""}${date ? `date=${date}&` : ""}${
    tag ? `tag=${tag}&` : ""
  }${name ? `name=${name}&` : ""}`;

  const { data, isLoading } = useGetSearchAndFilterWallpapersQuery(
    `?${queries?.slice(0, -1)}&page=${meta?.page}&limit=${meta?.limit}`
  );
  const [wallpapers, setWallpapers] = useState([]);
  const [tab1, setTab1] = useState("Trending");
  const [tab2, setTab2] = useState("All");
  const [tab3, setTab3] = useState("SFW");

  const queryObject = {
    search: search || "",
    tn: tn || "Trending",
    type: type || "",
    classification: classification || "",
    width: width || "",
    height: height || "",
    screen_type: screen_type || "",
    sort_by: sort_by || "",
    date: date || "",
    tag: tag || "",
    name: name || "",
  };

  useMemo(() => {
    if (data?.data) {
      if (data?.data?.data?.length > 0) {
        if (meta?.page === 1) {
          setWallpapers(data?.data?.data);
          setMeta(data?.data?.meta);
        } else {
          setWallpapers([...wallpapers, ...data.data.data]);
          setMeta(data?.data?.meta);
        }
      }
    }
  }, [data]);

  const handleQuery = async (name, value, isDelete = false) => {
    if (name === "dimensions") {
      const query = await makeQuery(
        "",
        "",
        {
          ...queryObject,
          width: value.width,
          height: value.height,
        },
        true, // isDimensions
        isDelete
      );
      window.location.replace(`?${query}`);
    } else {
      const query = await makeQuery(name, value, queryObject, isDelete);
      window.location.replace(`?${query}`);
    }
  };

  const isTrue = (tab3 === "NSFW" && user?.settings?.nsfw) || tab3 !== "NSFW";

  const types = ["all", "illustration", "photography", "ai"];
  useEffect(() => {
    if (type && types.includes(type.toLowerCase())) {
      setTab2(type);
    }
    if (
      tn &&
      ["trending", "new", "top wallpapers"].includes(tn.toLowerCase())
    ) {
      setTab1(tn);
    }
    if (
      classification &&
      ["sfw", "nsfw"].includes(classification.toLowerCase())
    ) {
      setTab3(classification);
    }
  }, [queries]);

  const detectDevice = () => {
    if (!router.isReady) return;
    const isPhone = window.innerWidth <= 768;
    if (screen_type === "" && isPhone) {
      handleQuery("screen_type", "Phones");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      detectDevice();
      window.addEventListener("resize", detectDevice);
    }

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, []);

  return (
    <>
      <TitleHeader />

      <div className="w-full h-full">
        <SearchWallpapersSearchInput handleQuery={handleQuery} />

        <SearchWallpapersTabs
          tab1={tab1}
          setTab1={setTab1}
          tab2={tab2}
          setTab2={setTab2}
          tab3={tab3}
          setTab3={setTab3}
          handleQuery={handleQuery}
        />
        <div className="mb-[27px]"></div>
        {/* <div className="border-t-[1px] border-[#5A5A5A] mt-[39px] mb-[27px] hidden md:block"></div> */}

        {tab3 === "NSFW" && !isLoading && (
          <>{!user?.settings?.nsfw && <SearchWallpaperNsfwAria />}</>
        )}
        {isTrue && (
          <>
            {isLoading && wallpapers?.length < 1 && <PageLoading />}
            {!isLoading && wallpapers?.length > 0 && (
              <>
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-[14px] gap-y-[14px] md:gap-x-[16px] md:gap-y-[32px] lg:gap-x-[26px] lg:gap-y-[42px]">
                  {wallpapers?.map((item, index) => (
                    <SingleSearchWallpaper key={index} item={item} />
                  ))}
                </div>

                {meta?.limit * meta.page < meta?.total && (
                  <div
                    onClick={() => setMeta({ ...meta, page: meta.page + 1 })}
                    className="bg-[#000000] w-[128px] h-[42px] rounded-[100px] mx-auto mt-[27px] flex justify-center items-center font-bakbak-one text-[12px] text-[#CCC] cursor-pointer"
                  >
                    Load More
                  </div>
                )}
              </>
            )}

            {!isLoading && wallpapers?.length < 1 && (
              <NoData title="No wallpapers have been uploaded yet." />
            )}
          </>
        )}
      </div>
    </>
  );
};
export default SearchWallpapers;

SearchWallpapers.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
