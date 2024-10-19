/* eslint-disable react/prop-types */
import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
} from "react-share";
import {
  iShare1,
  iShare2,
  iShare3,
  iShare4,
  iShare5,
  iShare6,
} from "../../utils/icons/icons";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { CLIENT_URL } from "../../lib/config";
import { useRouter } from "next/router";

const ShareIcons = ({ author }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [url, setUrl] = useState("");

  useMemo(() => {
    if (author) {
      if (pathname.includes("/profiles/") || pathname.includes("/my-profile")) {
        setUrl(`${CLIENT_URL}/profiles/${author?.slug}`);
      } else {
        setUrl(`${CLIENT_URL}/brands/${author?.slug}`);
      }
    }
  }, [author]);
  return (
    <>
      <div className="flex justify-center items-end flex-wrap gap-x-[22px] gap-y-[20px] mt-[11px] px-[11px] cursor-pointer">
        <div className="flex flex-col items-center gap-[8px]">
          <TwitterShareButton url={url}>
            <div className="w-[30px] h-[30px] bg-[#00000066] rounded flex justify-center items-center">
              {iShare1}
            </div>
          </TwitterShareButton>
          <TwitterShareButton url={url}>
            <h1 className="text-[#FFF] font-lato text-[10px]">X</h1>
          </TwitterShareButton>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <FacebookShareButton url={url}>
            <div className="w-[30px] h-[30px] bg-[#00000066] rounded flex justify-center items-center">
              {iShare2}
            </div>
          </FacebookShareButton>
          <FacebookShareButton url={url}>
            <h1 className="text-[#FFF] font-lato text-[10px]">Facebook</h1>
          </FacebookShareButton>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <WhatsappShareButton url={url}>
            <div className="w-[30px] h-[30px] bg-[#00000066] rounded flex justify-center items-center">
              {iShare3}
            </div>
          </WhatsappShareButton>
          <WhatsappShareButton url={url}>
            <h1 className="text-[#FFF] font-lato text-[10px]">WhatsApp</h1>
          </WhatsappShareButton>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <div
            onClick={() => () =>
              window.open(
                `https://discord.com/channels/@me?message=${encodeURIComponent(
                  url
                )}`,
                "_blank"
              )}
            className="w-[30px] h-[30px] bg-[#00000066] rounded flex justify-center items-center"
          >
            {iShare4}
          </div>
          <h1
            onClick={() => () =>
              window.open(
                `https://discord.com/channels/@me?message=${encodeURIComponent(
                  url
                )}`,
                "_blank"
              )}
            className="text-[#FFF] font-lato text-[10px]"
          >
            Discord
          </h1>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <a
            href={`mailto:?subject=Check%20out%20my%20profile&body=${encodeURIComponent(
              url
            )}`}
          >
            <div className="w-[30px] h-[30px] bg-[#00000066] rounded flex justify-center items-center">
              {iShare5}
            </div>
          </a>
          <a
            href={`mailto:?subject=Check%20out%20my%20profile&body=${encodeURIComponent(
              url
            )}`}
          >
            <h1 className="text-[#FFF] font-lato text-[10px]">Email</h1>
          </a>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <div
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Link Copied");
            }}
            className="w-[30px] h-[30px] bg-[#00000066] rounded flex justify-center items-center"
          >
            {iShare6}
          </div>
          <h1
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Link Copied");
            }}
            className="text-[#FFF] font-lato text-[10px]"
          >
            Copy Link
          </h1>
        </div>
      </div>
    </>
  );
};

export default ShareIcons;
