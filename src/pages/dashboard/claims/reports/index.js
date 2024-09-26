import { useState } from "react";
import inboxBg from "../../../../assets/images/dashboard-images/claim-reports/inbox.png";
import SingleReport from "../../../../components/dashboard-components/claimsReports/SingleReport";
import { Button } from "@material-tailwind/react";
import ClaimDetails from "../../../../components/dashboard-components/claimsReports/ClaimDetails";
import {
  useGetClaimRequestsQuery,
  useGetRemovalRequestsQuery,
  useGetReviewedReportsQuery,
  useGetUserReportsQuery,
} from "../../../../redux/features/reports/reportsApi";
import DashboardPrivateRoute from "@/middlewares/DashboardPrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ROLE_DATA } from "@/lib/config";

const tabs = ["Removal Request", "Claim Listing", "User Report", "Reviewed"];

// const removalItems = [
//   {
//     _id: 1,
//     user: { username: "robiulalamdev" },
//     status: "Removal",
//     reportType: "Removal Request",
//     message: "has submitted a removal request.",
//   },
//   {
//     _id: 2,
//     user: { username: "kaz" },
//     status: "Removal",
//     reportType: "Removal Request",
//     message: "has submitted a removal request.",
//   },
//   {
//     _id: 3,
//     user: { username: "Fulcrum" },
//     status: "Removal",
//     reportType: "Removal Request",
//     message: "has submitted a removal request.",
//   },
// ];
// const claimItems = [
//   {
//     _id: 1,
//     user: { username: "robiulalamdev" },
//     status: "Removal",
//     reportType: "Claim Request",
//     message: "has submitted a claim.",
//   },
//   {
//     _id: 2,
//     user: { username: "kaz" },
//     status: "Removal",
//     reportType: "Claim Request",
//     message: "has submitted a claim.",
//   },
//   {
//     _id: 3,
//     user: { username: "Fulcrum" },
//     status: "Removal",
//     reportType: "Claim Request",
//     message: "has submitted a claim.",
//   },
// ];
// const userReports = [
//   {
//     _id: 1,
//     user: { username: "robiulalamdev" },
//     status: "Removal",
//     reportType: "User Report",
//     message: "has reported an user.",
//   },
//   {
//     _id: 2,
//     user: { username: "kaz" },
//     status: "Removal",
//     reportType: "User Report",
//     message: "has reported an user.",
//   },
//   {
//     _id: 3,
//     user: { username: "Fulcrum" },
//     status: "Removal",
//     reportType: "User Report",
//     message: "has reported an user.",
//   },
// ];
// const reviewed = [
//   {
//     _id: 1,
//     user: { username: "robiulalamdev" },
//     status: "Removal",
//     reportType: "Claim Request",
//     message: "has claim request.",
//   },
//   {
//     _id: 2,
//     user: { username: "kaz" },
//     status: "Removal",
//     reportType: "User Report",
//     message: "has reported an user.",
//   },
//   {
//     _id: 3,
//     user: { username: "Fulcrum" },
//     status: "Removal",
//     reportType: "User Report",
//     message: "has reported an user.",
//   },
// ];

const ClaimsReports = () => {
  const { data: userReports } = useGetUserReportsQuery();
  const { data: removalRequests } = useGetRemovalRequestsQuery();
  const { data: claimRequests } = useGetClaimRequestsQuery();
  const { data: reviewedReports } = useGetReviewedReportsQuery();
  const [selectedTab, setSelectedTab] = useState("Removal Request");
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <h1 className="text-white font-bakbak-one text-[30px] font-normal leading-normal mt-[37px] ml-[549px] text-nowrap">
        Claims & Reports
      </h1>
      <div className="bg-[#121212] rounded-[10px] mt-[46px] w-full h-full flex-grow flex justify-between min-w-[1500px]">
        <div className="border-r-[1px] border-[#222222] w-full max-w-[202px] min-w-[202px] h-full">
          <div
            className="h-[103px] border-b-[1px] border-[#222222] flex justify-center items-center"
            style={{
              borderRadius: "10px 0px 0px 0px",
              background: `url(${inboxBg.src}) lightgray 50% / cover no-repeat`,
            }}
          >
            <h1 className="text-white font-lato text-[20px] font-bold leading-normal">
              The Inbox
            </h1>
          </div>
          {tabs.map((tab, index) => (
            <div key={index} className="h-[80px] flex items-center">
              <Button
                onClick={() => {
                  setSelectedItem(null);
                  setSelectedTab(tab);
                }}
                className={`pl-[39px] pr-0 py-0  ${
                  tab === selectedTab ? "bg-[#FF001F]" : "bg-transparent"
                } h-[34px] min-w-[187px] max-w-[187px] w-full rounded-r-[5px] rounded-l-[0px] normal-case font-normal hover:shadow-none`}
              >
                <h1 className="text-white font-lato text-[12px] font-semibold leading-normal text-left">
                  {tab}
                </h1>
              </Button>
            </div>
          ))}
        </div>
        <div className="border-r-[1px] border-[#222222] w-full max-w-[363px] min-w-[363px] h-full overflow-y-auto">
          {selectedTab === "Removal Request" && (
            <>
              {removalRequests?.data?.map((item, index) => (
                <SingleReport
                  key={index}
                  item={item}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              ))}
            </>
          )}
          {selectedTab === "Claim Listing" && (
            <>
              {claimRequests?.data?.map((item, index) => (
                <SingleReport
                  key={index}
                  item={item}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              ))}
            </>
          )}
          {selectedTab === "User Report" && (
            <>
              {userReports?.data?.map((item, index) => (
                <SingleReport
                  key={index}
                  item={item}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              ))}
            </>
          )}
          {selectedTab === "Reviewed" && (
            <>
              {reviewedReports?.data?.map((item, index) => (
                <SingleReport
                  key={index}
                  item={item}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              ))}
            </>
          )}
        </div>
        <div className="w-full h-full flex-grow px-[85px] pt-[23px] min-w-[900px]">
          {selectedItem && (
            <ClaimDetails
              data={selectedItem}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setSelectedItem={setSelectedItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPrivateRoute(
  [ROLE_DATA.ADMIN, ROLE_DATA.MOD],
  ClaimsReports,
  DashboardLayout
);
