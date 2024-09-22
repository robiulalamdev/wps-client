/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button } from "@material-tailwind/react";
import { DefaultProfile } from "../../../lib/data/globalData";
import moment from "moment";
import useViewImage from "../../../lib/hooks/useViewImage";
import { Link } from "react-router-dom";
import { useModifyVerificationMutation } from "../../../redux/features/verification/verificationApi";
import { toast } from "react-toastify";
import { useState } from "react";

const VerificationRequestDetails = ({
  data = null,
  selectedTab,
  setSelectedItem,
}) => {
  const { viewResizeImg } = useViewImage();
  const [modifyVerification] = useModifyVerificationMutation();
  const [dismissLoading, setDismissLoading] = useState(false);
  const [grantedLoading, setGrantedLoading] = useState(false);

  const handleAction = async (status = "") => {
    if (status === "Dismiss") {
      setDismissLoading(true);
    } else {
      setGrantedLoading(true);
    }
    const options = {
      id: data?._id,
      data: { status: status },
    };
    const result = await modifyVerification(options);
    if (result?.data?.success) {
      if (result?.data?.data) {
        setSelectedItem({ ...data, status: status });
      }
      toast.success(`Verification request ${status} successfully`);
    } else {
      toast.error(`Verification request ${status} unSuccessfully`);
    }
    setDismissLoading(false);
    setGrantedLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-[21px]">
          {data?.profile?.profile_image ? (
            <img
              src={viewResizeImg(data?.profile?.profile_image, 60, 60)}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          ) : (
            <img
              src={DefaultProfile}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          )}

          <h1 className="text-[#D9D9D9] font-lato leading-normal">
            <p className="text-[12px] font-normal inline">Requester: </p>{" "}
            <p className="text-white font-bold text-[14px] inline">
              {data?.user?.username}
            </p>
          </h1>
        </div>

        <h1 className="text-[#D9D9D9] font-lato leading-normal">
          <p className="text-[12px] font-normal inline">Request Type:</p>{" "}
          <p className="text-white font-bold text-[14px] inline">
            Verification
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
          {data?.status === "Dismiss" && (
            <Button
              disabled
              className="bg-[#FF0000] text-white p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              Dismiss
            </Button>
          )}

          {data?.status === "Pending" && (
            <Button
              disabled={grantedLoading}
              onClick={() => handleAction("Granted")}
              className="bg-[#8FFF00] text-black p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              {grantedLoading ? "Granted..." : "Granted"}
            </Button>
          )}
          {data?.status === "Granted" && (
            <Button
              disabled
              className="bg-[#8FFF00] text-black p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal"
            >
              Granted
            </Button>
          )}

          {selectedTab === "Reviewed" && (
            <Link to="/messages">
              <Button className="bg-[#0500FF] text-white p-0 w-[103px] h-[36px] rounded-[5px] hover:shadow-none shadow-none normal-case font-lato text-[12px] font-medium leading-normal">
                Send to Inbox
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-[63px]">
        <h1 className="text-[#D9D9D9] font-lato leading-normal">
          <p className="text-[12px] font-normal inline">Date Requested:</p>{" "}
          <p className="text-white font-bold text-[15px] inline">
            {" "}
            {moment(data?.createdAt).format("MM/DD/YYYY")}
          </p>
        </h1>
      </div>
      <div className="mt-[57px]">
        <h1 className="font-lato text-[15px] font-bold text-white leading-normal">
          Message:
        </h1>
        {data?.message && (
          <p className="mt-[27px] text-white font-lato text-[15px] font-normal leading-normal">
            {data?.user?.username} {data.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationRequestDetails;
