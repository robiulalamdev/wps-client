import { Button } from "@material-tailwind/react";
import RulesHeader from "../../components/shared/headers/RulesHeader";
import { useEffect, useState } from "react";
import DraftPublishSidebar from "../../components/upload/DraftPublishSidebar";
import filter from "../../assets/icons/search-wallpapers/filter.gif";
import {
  useGetMyDraftWallpapersQuery,
  useGetMyPublishedWallpapersQuery,
} from "../../redux/features/wallpapers/wallpapersApi";
import PageLoading from "../../components/common/loadings/PageLoading";
import VaultEmpty from "../../components/upload/VaultEmpty";
import VaultImages from "../../components/upload/VaultImages";
import PrivateRoute from "@/middlewares/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";

const DraftAndPublish = () => {
  const [tab1, setTab1] = useState("Drafts");
  const [open, setOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);

  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [selectedPublished, setSelectedPublished] = useState([]);

  const [pMeta, setPMeta] = useState({ page: 1, limit: 30, total: 0 });
  const [dMeta, setDMeta] = useState({ page: 1, limit: 30, total: 0 });

  const { data: draftItems, isLoading: draftLoading } =
    useGetMyDraftWallpapersQuery(`?page=${dMeta.page}&limit=${dMeta?.limit}`);

  const { data: publishedItems, isLoading: publishedLoading } =
    useGetMyPublishedWallpapersQuery(
      `?page=${pMeta.page}&limit=${pMeta?.limit}`
    );

  useEffect(() => {
    if (draftItems?.data?.length > 0) {
      if (dMeta?.page === 1) {
        setDrafts(draftItems?.data);
        setDMeta(draftItems?.meta);
      } else {
        setDrafts([...drafts, ...draftItems.data]);
        setDMeta(draftItems?.meta);
      }
    } else {
      setDrafts([]);
    }
  }, [draftItems]);

  useEffect(() => {
    if (publishedItems?.data?.length > 0) {
      if (pMeta?.page === 1) {
        setPublished(publishedItems?.data);
        setPMeta(publishedItems?.meta);
      } else {
        setPublished([...published, ...publishedItems.data]);
        setPMeta(publishedItems?.meta);
      }
    } else {
      setPublished([]);
    }
  }, [publishedItems]);

  const handleDraftSelect = async (item) => {
    const itemIndex = await selectedDrafts.findIndex(
      (sItem) => sItem?._id === item?._id
    );
    if (itemIndex !== -1) {
      const stored = [...selectedDrafts];
      stored.splice(itemIndex, 1);
      setSelectedDrafts(stored);
    } else {
      setSelectedDrafts([...selectedDrafts, item]);
    }
  };

  const handlePublishedSelect = async (item) => {
    const itemIndex = await selectedPublished.findIndex(
      (sItem) => sItem?._id === item?._id
    );
    if (itemIndex !== -1) {
      const stored = [...selectedPublished];
      stored.splice(itemIndex, 1);
      setSelectedPublished(stored);
    } else {
      setSelectedPublished([...selectedPublished, item]);
    }
  };

  const handleTab = (t) => {
    setTab1(t);
  };

  return (
    <>
      <RulesHeader />
      <div>
        <h1 className="text-[#FFF] text-center font-bakbak-one text-[15px] md:text-[25px]">
          The Vault
        </h1>
        <div className="border-t-[1px] border-[#5A5A5A] mt-[15px] mb-[24px] md:mt-[39.51px] md:mb-[26.49px] w-full"></div>

        <div className="max-w-[295px] flex justify-start lg:justify-center mb-[21px]">
          <div className="bg-[#00000033] rounded-[100px] w-[186px] h-[45px] flex justify-between items-center px-[8px]">
            {["Drafts", "Published"].map((t, i) => (
              <Button
                onClick={() => handleTab(t)}
                key={i}
                className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[86px] h-[32px] md:min-w-[86px] md:h-[32px]  ${
                  tab1 === t
                    ? `${
                        t === "Drafts" ? "bg-[#DD2E44]" : "bg-[#63B126]"
                      } !text-white rounded-[100px]`
                    : "bg-transparent !text-[#C6C6C6]"
                }`}
              >
                {t}
              </Button>
            ))}
          </div>

          <img
            onClick={() => setOpen(!open)}
            src={filter.src}
            alt=""
            className="w-[57px] h-[39px] lg:hidden"
          />
        </div>

        <div className="flex justify-between items-start gap-x-[28px] min-h-[986px] max-h-[1010px] h-full">
          {tab1 === "Drafts" ? (
            <DraftPublishSidebar
              open={open}
              setOpen={setOpen}
              selectedImages={selectedDrafts}
              resetSelect={setSelectedDrafts}
              items={drafts}
              currentTab={tab1}
            />
          ) : (
            <DraftPublishSidebar
              open={open}
              setOpen={setOpen}
              selectedImages={selectedPublished}
              resetSelect={setSelectedPublished}
              items={published}
              currentTab={tab1}
            />
          )}

          <div className="w-full h-full flex-grow min-h-[986px] max-h-[986px] overflow-y-auto">
            {draftLoading && tab1 === "Drafts" && <PageLoading />}
            {publishedLoading && tab1 === "Published" && <PageLoading />}

            {!draftLoading && tab1 === "Drafts" && drafts?.length > 0 && (
              <VaultImages
                images={drafts}
                selectedImages={selectedDrafts}
                handleSelectImages={handleDraftSelect}
              />
            )}
            {!publishedLoading &&
              tab1 === "Published" &&
              published?.length > 0 && (
                <VaultImages
                  images={published}
                  selectedImages={selectedPublished}
                  handleSelectImages={handlePublishedSelect}
                />
              )}

            {tab1 === "Drafts" && drafts?.length < 1 && <VaultEmpty />}
            {tab1 === "Published" && published?.length < 1 && <VaultEmpty />}

            {dMeta?.limit * dMeta.page < dMeta?.total && tab1 === "Drafts" && (
              <div
                onClick={() => setDMeta({ ...dMeta, page: dMeta.page + 1 })}
                className="bg-[#000000] w-[128px] h-[42px] rounded-[100px] mx-auto mt-[27px] md:mt-[40px] flex justify-center items-center font-bakbak-one text-[12px] text-[#CCC] cursor-pointer"
              >
                View more
              </div>
            )}
            {pMeta?.limit * pMeta.page < pMeta?.total &&
              tab1 === "Published" && (
                <div
                  onClick={() => setPMeta({ ...pMeta, page: pMeta.page + 1 })}
                  className="bg-[#000000] w-[128px] h-[42px] rounded-[100px] mx-auto mt-[27px] md:mt-[40px] flex justify-center items-center font-bakbak-one text-[12px] text-[#CCC] cursor-pointer"
                >
                  View more
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(DraftAndPublish, MainLayout);
