/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { iPMail, iPReport, iPUpload } from "../../utils/icons/icons";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import ReportDialog from "./ReportDialog";
import MailDialog from "./MailDialog";
import { AuthContext } from "../../contextApi/AuthContext";
import ShareIcons from "../common/ShareIcons";
import { useNavigate } from "react-router-dom";

const BannerActionButtons = ({ author, brand = false }) => {
  const { user } = useContext(AuthContext);
  const [reportOpen, setReportOpen] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setMailOpen(true);
    }
  };

  return (
    <>
      <div className="flex justify-start md:justify-end items-center gap-x-[8px] cursor-pointer">
        {author?.settings?.messaging && !brand && (
          <>
            {user?._id !== author?._id && (
              <div
                onClick={() => handleOpen(true)}
                className="w-[25px] md:w-[36px] h-[25px] md:h-[35px]"
              >
                {iPMail}
              </div>
            )}
          </>
        )}

        <Popover placement="bottom-end">
          <PopoverHandler>
            <div className="w-[25px] md:w-[36px] h-[25px] md:h-[35px]">
              {iPUpload}
            </div>
          </PopoverHandler>
          <PopoverContent className="max-w-[377px] w-full min-h-[102px] pb-[20px] px-[9px] pt-[5px] bg-[#090A0C] rounded-[10px] outline-none border-none">
            <h1 className="text-[#FFF] font-bakbak-one text-center text-[15px]">
              Share this wallpaper with friends
            </h1>

            <ShareIcons author={author} />
          </PopoverContent>
        </Popover>
        {user && user?._id !== author?._id && (
          <div
            onClick={() => setReportOpen(true)}
            className="w-[25px] md:w-[36px] h-[25px] md:h-[35px]"
          >
            {iPReport}
          </div>
        )}
      </div>

      <ReportDialog
        reportOpen={reportOpen}
        setReportOpen={setReportOpen}
        author={author}
      />
      <MailDialog
        mailOpen={mailOpen}
        setMailOpen={setMailOpen}
        author={author}
      />
    </>
  );
};

export default BannerActionButtons;
