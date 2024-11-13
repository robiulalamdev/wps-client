import { Button } from "@material-tailwind/react";
import TitleHeader from "../../components/shared/headers/TitleHeader";
import OfficialBrandSearch from "../../components/officialBrands/OfficialBrandSearch";
import {
  useGetAllOfficialBrandsQuery,
  useGetOfficialBrandsQuery,
} from "../../redux/features/users/usersApi";
import LazyWallpaper from "../../components/common/wallpaper/LazyWallpaper";
import { useMemo, useState } from "react";
import { makeQuery } from "../../lib/services/service";
import PageLoading from "../../components/common/loadings/PageLoading";
import { useGetPublicBrandFeaturedQuery } from "../../redux/features/featured/featuredApi";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "@/layouts/MainLayout";

const OfficialBrands = () => {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 50, total: 0 });
  const search = router.query?.search;

  const { data: official_brands } = useGetPublicBrandFeaturedQuery();

  const { data, isLoading } = useGetAllOfficialBrandsQuery(
    `?page=${meta?.page}&limit=${meta?.limit}${
      search ? `&search=${search}` : ""
    }`
  );

  // console.log(data);

  const characters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );

  const queryObject = {
    search: search || "",
  };

  useMemo(() => {
    if (search) {
      if (data?.data?.length > 0) {
        if (meta?.page === 1) {
          setBrands(data?.data);
          setMeta(data?.meta);
        } else {
          setBrands([...brands, ...data.data]);
          setMeta(data?.meta);
        }
      }
    } else {
      if (official_brands?.data?.length > 0) {
        setBrands(official_brands?.data);
      }
    }
  }, [data, official_brands]);

  const handleQuery = async (name, value, isDelete = false) => {
    const query = await makeQuery(name, value, queryObject, isDelete);
    window.location.replace(`?${query}`);
  };

  return (
    <>
      <TitleHeader />
      <div className="w-full h-full">
        <OfficialBrandSearch handleQuery={handleQuery} />

        <div className="w-full h-full max-w-full overflow-x-auto mt-[21px] md:mt-[41px]">
          <div className="flex items-center gap-x-[26px] w-fit lg:mx-auto mb-[21px] lg:mb-0">
            <Button
              onClick={() => {
                router.push("/official-brands");
              }}
              className="bg-[#00000033] font-normal hover:shadow-none shadow-none normal-case text-white p-0 w-[100px] h-[42px] rounded-[23.5px] text-[12px] font-lato"
            >
              Featured
            </Button>
            <div className="lg:flex justify-center items-center gap-x-[16px] flex-grow w-fit rounded-[23.5px] bg-[#00000033] h-[42px] px-[28px] hidden lg:inline-block">
              {characters.map((chrt, index) => (
                <div
                  key={index}
                  onClick={() => handleQuery("search", chrt)}
                  className={`w-[25px] h-[25px] rounded-[5px] flex justify-center items-center cursor-pointer ${
                    chrt.toLocaleLowerCase() === search?.toLocaleLowerCase()
                      ? "bg-[#838383] text-[#262626]"
                      : "text-white hover:bg-[#83838344]"
                  }`}
                >
                  <h1 className="cursor-pointer text-current text-[15px] font-lato font-normal">
                    {chrt}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-[50px]"></div>
        {/* <div className="border-t-[1px] border-[#5A5A5A] mt-[39px] mb-[50px] hidden md:block"></div> */}
        {isLoading ? (
          <PageLoading />
        ) : (
          <>
            <div className="grid grid-cols-6 md:grid-cols-4 gap-x-[9px] gap-y-[6px] md:gap-x-[14px] md:gap-y-[29px]">
              {brands?.map((item, index) => (
                <div
                  key={index}
                  className={`col-span-2 md:col-span-1 ${
                    index < 3 && "md:!col-span-2"
                  } ${index === 0 && "row-span-2 md:row-span-1 col-span-3"} ${
                    index === 1 && "col-span-3"
                  } ${index === 2 && "col-span-3"}`}
                >
                  <div
                    onClick={() => router.push(`/profiles/${item?.slug}`)}
                    className={`w-full ${
                      index === 0 ? "h-[210px]" : "h-[92px]"
                    } md:h-[257px] !rounded-[10px] md:rounded-[30px] overflow-hidden cursor-pointer relative`}
                  >
                    <LazyWallpaper
                      src={item?.banner}
                      alt={item?.banner}
                      maxWidth={600}
                      maxHeight={257}
                      width={600}
                      height={257}
                      className="w-full h-full !rounded-[10px] md:rounded-[30px] object-cover"
                    />
                  </div>
                  <Link href={`/profiles/${item?.slug}`}>
                    <h1 className="font-bold font-lato text-[10px] md:text-[20px] text-white mt-[3px] md:mt-[11px] text-center">
                      {search ? item.name : item?.title || item?.name}
                    </h1>
                  </Link>
                </div>
              ))}
            </div>
            {meta?.limit * meta.page < meta?.total && search && (
              <div
                onClick={() => setMeta({ ...meta, page: meta.page + 1 })}
                className="bg-[#000000] w-[128px] h-[42px] rounded-[100px] mx-auto mt-[27px] md:mt-[40px] flex justify-center items-center font-bakbak-one text-[12px] text-[#CCC] cursor-pointer"
              >
                View more
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OfficialBrands;

OfficialBrands.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
