import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { iOnline } from "../../utils/icons/dashboard-icons/dashicons";
import AdminChat from "../../components/dashboard-components/DashboardHome/AdminChat/AdminChat";
import MostFavorited from "../../components/dashboard-components/DashboardHome/MostFavorited";
import TopCategories from "../../components/dashboard-components/DashboardHome/TopCategories";
import MostDownloaded from "../../components/dashboard-components/DashboardHome/MostDownloaded";
import { useSelector } from "react-redux";
import { useGetDashboardAnalyticsQuery } from "../../redux/features/analytics/analyticsApi";
import { useGetTotalReportsQuery } from "../../redux/features/reports/reportsApi";
import useViewImage from "../../lib/hooks/useViewImage";
import DashboardPrivateRoute from "@/middlewares/DashboardPrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ROLE_DATA } from "@/lib/config";

const tabs = [
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "This Year",
  "All Data",
];

const Dashboard = () => {
  const { viewResizeImg } = useViewImage();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { data } = useGetDashboardAnalyticsQuery(`?date=${selectedTab}`);
  const { data: reportsData } = useGetTotalReportsQuery();
  const { totalUsers = 0 } = useSelector((state) => state.global);

  // console.log(data?.data?.sponsors);

  return (
    <div className="flex justify-between gap-[17px] w-full h-full">
      <div className="flex-grow max-w-[1000px] min-w-[500px] w-full overflow-y-auto flex flex-col justify-between">
        <div className="flex items-center flex-wrap gap-[25px] w-full h-fit p-[10px] bg-dash-cm-bg rounded-[10px]">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              className={`min-w-[72px] h-[32px] rounded-[8px] shadow-none hover:shadow-none outline-none py-0 px-[8px] text-center normal-case text-white font-lato text-[15px] font-semibold ${
                selectedTab === tab ? "bg-[#FF001F]" : "bg-transparent"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="h-fit flex justify-between flex-wrap 2xl:flex-nowrap gap-[18px] mt-[9px]">
          <div className="h-[102px] bg-dash-cm-bg rounded-[10px] flex flex-col justify-center items-center w-full gap-[14px]">
            <div className="flex items-center gap-[6px]">
              <h1 className="text-white font-lato font-medium text-[15px]">
                Online Now
              </h1>
              {iOnline}
            </div>
            <h1 className="text-white font-lato text-[20px] font-bold">
              {totalUsers}
            </h1>
          </div>
          <div className="h-[102px] bg-dash-cm-bg rounded-[10px] flex flex-col justify-center items-center w-full gap-[14px]">
            <h1 className="text-white font-lato font-medium text-[15px]">
              Total Visitors
            </h1>
            <h1 className="text-white font-lato text-[20px] font-bold">
              {data?.data?.totalVisitors}
            </h1>
          </div>
          <div className="h-[102px] bg-dash-cm-bg rounded-[10px] flex flex-col justify-center items-center w-full gap-[14px]">
            <h1 className="text-white font-lato font-medium text-[15px]">
              Registered Accounts
            </h1>
            <h1 className="text-white font-lato text-[20px] font-bold">
              {data?.data?.totalRegisteredAccounts}
            </h1>
          </div>
        </div>

        <div className="h-[24vh] bg-dash-cm-bg rounded-[10px] flex flex-col justify-between items-center w-full gap-[14px] mt-[13px]">
          <h1 className="text-white font-lato font-medium text-[15px] pt-[19px] text-center">
            Wallpapers Downloaded
          </h1>
          <h1 className="text-white font-lato text-[30px] font-bold">
            {data?.data?.totalDownloadedWallpapers}
          </h1>
          <span></span>
        </div>

        <div className="h-[24vh] bg-dash-cm-bg rounded-[10px] flex flex-col justify-between items-center w-full gap-[14px] mt-[19px]">
          <h1 className="text-white font-lato font-medium text-[15px] pt-[19px] text-center">
            Wallpapers Uploaded
          </h1>
          <h1 className="text-white font-lato text-[30px] font-bold">
            {data?.data?.totalUploadedWallpapers}
          </h1>
          <span></span>
        </div>

        {/* h-[25.5vh] max-h-fit */}
        <div className="min-h-[215px] flex-grow bg-dash-cm-bg rounded-[10px] w-full gap-[14px] mt-[19px] pb-[8px]">
          <h1 className="text-white font-lato font-medium text-[15px] pt-[19px] text-center">
            Sponsor Click-Through Links
          </h1>
          <div className="flex justify-center items-center flex-wrap 2xl:flex-nowrap gap-x-[35px] 2xl:gap-x-[60px] gap-y-[30px] mt-[40px]">
            {data?.data?.sponsors?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-[14px]"
              >
                <img
                  src={viewResizeImg(item?.banner)}
                  alt=""
                  className="size-[70px] rounded-[5px] object-cover"
                />
                <h1 className="text-white font-lato text-[15px] font-bold">
                  {item?.totalClicks}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[425px] min-w-[300px] w-full overflow-y-auto flex flex-col justify-between">
        <MostFavorited />
        <TopCategories />
        <MostDownloaded />
        <div className="dh-[133px] flex-grow bg-dash-cm-bg rounded-[10px] flex flex-col justify-between items-center w-full gap-[14px] mt-[13px]">
          <h1 className="text-white font-lato font-medium text-[15px] pt-[19px] text-center">
            Claims & Reports
          </h1>
          <h1 className="text-white font-lato text-[30px] font-bold">
            {reportsData?.data || 0}
          </h1>
          <span></span>
        </div>
      </div>
      <AdminChat />
    </div>
  );
};

export default DashboardPrivateRoute(
  [ROLE_DATA.ADMIN, ROLE_DATA.MOD],
  Dashboard,
  DashboardLayout
);

// allowedRoles={[ROLE_DATA.ADMIN, ROLE_DATA.MOD]}
