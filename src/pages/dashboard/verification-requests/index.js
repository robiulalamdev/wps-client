import { useState } from "react";
import verification from "../../../assets/images/dashboard-images/verification-request/verification.png";
import SingleReport from "../../../components/dashboard-components/claimsReports/SingleReport";
import { Button } from "@material-tailwind/react";
import VerificationRequestDetails from "../../../components/dashboard-components/VerificationRequest/VerificationRequestDetails";
import {
  useGetReviewedVerificationsQuery,
  useGetVerificationsQuery,
} from "../../../redux/features/verification/verificationApi";
import SingleVerification from "../../../components/dashboard-components/VerificationRequest/SingleVerification";
import DashboardPrivateRoute from "@/middlewares/DashboardPrivateRoute";
import { ROLE_DATA } from "@/lib/config";
import DashboardLayout from "@/layouts/DashboardLayout";

const tabs = ["Verification Requests", "Reviewed"];
// const removalItems = [
//   {
//     _id: 1,
//     user: { username: "robiulalamdev" },
//     status: "Removal",
//     message: "has requested artist verification.",
//   },
//   {
//     _id: 2,
//     user: { username: "kaz" },
//     status: "Removal",
//     message: "has requested artist verification.",
//   },
//   {
//     _id: 3,
//     user: { username: "Fulcrum" },
//     status: "Removal",
//     message: "has requested artist verification.",
//   },
// ];

// const reviewed = [
//   {
//     _id: 1,
//     user: { username: "robiulalamdev" },
//     status: "",
//     message: "has requested artist verification.",
//   },
//   {
//     _id: 2,
//     user: { username: "kaz" },
//     status: "",
//     message: "has requested artist verification.",
//   },
//   {
//     _id: 3,
//     user: { username: "Fulcrum" },
//     status: "",
//     message: "has requested artist verification.",
//   },
// ];

const VerificationRequests = () => {
  const { data } = useGetVerificationsQuery();
  const { data: reviewedData } = useGetReviewedVerificationsQuery();
  const [selectedTab, setSelectedTab] = useState("Verification Requests");
  const [selectedItem, setSelectedItem] = useState(null);

  // console.log(data);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <h1 className="text-white font-bakbak-one text-[30px] font-normal leading-normal mt-[37px] ml-[549px] text-nowrap">
        Verification Requests
      </h1>
      <div className="bg-[#121212] rounded-[10px] mt-[46px] w-full h-full flex-grow flex justify-between min-w-[1500px]">
        <div className="border-r-[1px] border-[#222222] w-full max-w-[202px] min-w-[202px] h-full">
          <div
            className="h-[103px] border-b-[1px] border-[#222222] flex justify-center items-center"
            style={{
              borderRadius: "10px 0px 0px 0px",
              background: `url(${verification.src}) lightgray 50% / cover no-repeat`,
            }}
          >
            <h1 className="text-white font-lato text-[20px] font-bold leading-normal">
              Verifications
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
          {selectedTab === "Verification Requests" && (
            <>
              {data?.data?.map((item, index) => (
                <SingleVerification
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
              {reviewedData?.data?.map((item, index) => (
                <SingleVerification
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
            <VerificationRequestDetails
              data={selectedItem}
              selectedTab={selectedTab}
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
  VerificationRequests,
  DashboardLayout
);
