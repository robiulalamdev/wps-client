/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button } from "@material-tailwind/react";
import { DefaultProfile } from "../../../lib/data/globalData";

import wallpaper from "../../../assets/images/dashboard-images/claim-reports/wallapper.png";
import useViewImage from "../../../lib/hooks/useViewImage";
import moment from "moment";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useModifyReportMutation } from "../../../redux/features/reports/reportsApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { REPORT_TYPES } from "../../../lib/config";
import Link from "next/link";

const ClaimDetails = ({
  data = null,
  setSelectedTab,
  selectedTab,
  setSelectedItem,
}) => {
  const { viewResizeImg } = useViewImage();

  const [modifyReport] = useModifyReportMutation();
  const [dismissLoading, setDismissLoading] = useState(false);
  const [reviewedLoading, setReviewedLoading] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);

  const handleAction = async (status = "") => {
    if (status === "Dismiss") {
      setDismissLoading(true);
    } else if (status === "Pending") {
      setPendingLoading(true);
    } else {
      setReviewedLoading(true);
    }
    const options = {
      id: data?._id,
      data: { status: status },
    };
    const result = await modifyReport(options);
    if (result?.data?.success) {
      if (result?.data?.data) {
        if (status !== "Pending") {
          setSelectedItem(null);
        } else {
          setSelectedItem({ ...data, status: status });
        }
        if (status === "Pending" && result?.data?.data?.modifiedCount > 0) {
          if (data?.type === REPORT_TYPES.CLAIM_REQUEST) {
            setSelectedTab(REPORT_TYPES.CLAIM_REQUEST);
          }
          if (data?.type === REPORT_TYPES.REMOVAL_REQUEST) {
            setSelectedTab(REPORT_TYPES.REMOVAL_REQUEST);
          }
          if (data?.type === REPORT_TYPES.USER_REPORT) {
            setSelectedTab(REPORT_TYPES.USER_REPORT);
          }
        }
      }
      toast.success(`Report ${status} successfully`);
    } else {
      toast.error(`Report ${status} unSuccessfully`);
    }
    setDismissLoading(false);
    setReviewedLoading(false);
    setPendingLoading(false);
  };

  console.log(data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-[21px]">
          <img
            src={
              viewResizeImg(data?.reporter?.profile?.profile_image, 60, 60) ||
              DefaultProfile
            }
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <h1 className="text-[#D9D9D9] font-lato leading-normal">
            <p className="text-[12px] font-normal inline">Reporting user:</p>{" "}
            <p className="text-white font-bold text-[14px] inline">
              {data?.reporter?.username}
            </p>
          </h1>
        </div>

        <h1 className="text-[#D9D9D9] font-lato leading-normal">
          <p className="text-[12px] font-normal inline">Report Type:</p>{" "}
          <p className="text-white font-bold text-[14px] inline">
            {data?.type}
          </p>
        </h1>
        <div className="flex items-center gap-x-[39px]">
          {data?.status === "Pending" && (
            <Button
              disabled={dismissLoading}
              onClick={() => handleAction("Dismiss")}
              className="bg-[#FF0000] text-white p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              {dismissLoading ? "Dismiss..." : "Dismiss"}
            </Button>
          )}
          {/* {data?.status === "Dismiss" && (
            <Button
              disabled
              className="bg-[#FF0000] text-white p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              Dismiss
            </Button>
          )} */}

          {data?.status === "Pending" && (
            <Button
              disabled={reviewedLoading}
              onClick={() => handleAction("Reviewed")}
              className="bg-[#8FFF00] text-black p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              {reviewedLoading ? "Reviewed..." : "Reviewed"}
            </Button>
          )}
          {/* {data?.status === "Reviewed" && (
            <Button
              disabled
              className="bg-[#8FFF00] text-black p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              Reviewed
            </Button>
          )} */}

          {selectedTab === "Reviewed" && (
            <Button
              onClick={() => handleAction("Pending")}
              disabled={pendingLoading}
              className="bg-[#0500FF] text-white p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              {pendingLoading ? "Send to Inbox..." : "Send to Inbox"}
            </Button>
          )}
        </div>
      </div>
      {data?.type === "User Report" ? (
        <div className="mt-[63px] flex items-start gap-x-[240px]">
          <h1 className="text-[#D9D9D9] font-lato leading-normal">
            <p className="text-[12px] font-normal inline">Reported User:</p>{" "}
            <p className="text-white font-bold text-[15px] inline">
              {data?.data?.username}
            </p>
          </h1>
          <div>
            <h1 className="text-[#D9D9D9] font-lato leading-normal">
              <p className="text-[12px] font-normal inline">Date Reported:</p>{" "}
              <p className="text-white font-bold text-[15px] inline">
                {moment(data?.createdAt).format("MM/DD/YYYY")}
              </p>
            </h1>
            <h1 className="text-[#D9D9D9] font-lato leading-normal mt-[29px]">
              <p className="text-[12px] font-normal inline">Times Reported:</p>{" "}
              <p className="text-white font-bold text-[15px] inline">
                {data?.data?.totalReports}
              </p>
            </h1>
          </div>
        </div>
      ) : (
        <div className="mt-[63px]">
          <h1 className="font-lato text-[15px] font-bold text-white leading-normal">
            {data?.type === "Removal Request" && "Reported Wallpaper:"}
            {data?.type === "Claim Request" && "Claimed Wallpaper:"}
          </h1>
          <div className="mt-[16px] flex items-start gap-x-[26px]">
            {data?.data?.wallpaper && (
              <Link href={`/w/${data?.data?.slug}`} className="relative">
                <LazyWallpaper
                  src={data?.data?.wallpaper}
                  alt=""
                  maxWidth={350}
                  maxHeight={189}
                  width={350}
                  height={189}
                  className="w-[350px] h-[189px] rounded-[5px]"
                />
              </Link>
            )}

            <div>
              <h1 className="text-[#D9D9D9] font-lato leading-normal">
                <p className="text-[12px] font-normal inline">Posted By:</p>{" "}
                <p className="text-white font-bold text-[15px] inline">
                  {data?.data?.author?.username}
                </p>
              </h1>
              <h1 className="text-[#D9D9D9] font-lato leading-normal mt-[29px]">
                <p className="text-[12px] font-normal inline">Date Posted:</p>{" "}
                <p className="text-white font-bold text-[15px] inline">
                  {moment(data?.data?.createdAt).format("MM/DD/YYYY")}
                </p>
              </h1>
              <h1 className="text-[#D9D9D9] font-lato leading-normal mt-[29px]">
                <p className="text-[12px] font-normal inline">
                  Times Reported:
                </p>{" "}
                <p className="text-white font-bold text-[15px] inline">
                  {data?.data?.totalReports}
                </p>
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="mt-[57px]">
        <h1 className="font-lato text-[15px] font-bold text-white leading-normal">
          Message:
        </h1>
        <p className="mt-[27px] text-white font-lato text-[15px] font-normal leading-normal">
          {data?.message}
        </p>
      </div>
    </div>
  );
};

export default ClaimDetails;
