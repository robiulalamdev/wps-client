/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dialog } from "@material-tailwind/react";
import React, { useState } from "react";
import { iSearchClose } from "../../utils/icons/icons";
import { useSendReportMutation } from "../../redux/features/reports/reportsApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import { REPORT_TYPES, ROLE_DATA } from "../../lib/config";

const ReportDialog = ({ reportOpen, setReportOpen, author }) => {
  const [step, setStep] = useState(1);
  const [sendReport, { isLoading }] = useSendReportMutation();
  const { handleSubmit, register, reset } = useForm();

  const handleSendReport = async (data) => {
    const options = {
      data: {
        message: data?.message,
        targetId: author?._id,
        type: REPORT_TYPES.USER_REPORT,
        targetType: ROLE_DATA.USER,
      },
    };
    const result = await sendReport(options);
    if (result?.data?.success) {
      reset();
      setStep(2);
      toast.success("Report Send Successfully");
    } else {
      if (result?.data?.type === "exist") {
        toast.error("Already Reported");
      } else {
        toast.error("Report Send Failed");
        setReportOpen(false);
        setStep(1);
      }
    }
  };
  return (
    <>
      <Dialog
        open={reportOpen}
        handler={() => {
          setReportOpen(false);
          setStep(1);
        }}
        size="xs"
        className="px-4 sm:p-0 bg-[#2D2D2D] max-w-[384px] w-full min-h-[332px] relative"
      >
        <div
          onClick={() => {
            setReportOpen(false);
            reset();
            setStep(1);
          }}
          className="absolute top-[10px] right-[12px] cursor-pointer"
        >
          {iSearchClose}
        </div>

        {step === 1 && (
          <form
            onSubmit={handleSubmit(handleSendReport)}
            className="max-w-[324px] mx-auto w-full pb-[15px]"
          >
            <h1 className="text-[#FFF] text-[20px] font-bakbak-one mt-[29px]">
              Explain your report
            </h1>
            <p className="text-[#939393] text-[12px] font-bakbak-one mt-[14px]">
              Tell us why you think this user violates our rules
            </p>

            <div className="mt-[17px]">
              <span className="mb-[13px] text-[#FFF] text-[15px] font-bakbak-one">
                Message
              </span>
              <textarea
                {...register("message", { required: true })}
                placeholder="Write the details here."
                required={true}
                className="min-h-[68px] outline-none max-h-[150px] w-full bg-[#202020] rounded-[10px] placeholder:text-[#5B5B5B] text-[#fff] text-[12px] placeholder:text-[12px] font-bakbak-one placeholder:font-bakbak-one py-[8px] px-[13px]"
              ></textarea>
            </div>

            <button className="w-[158px] h-[37px] bg-[#FFF] rounded-[10px] text-[#202020] text-[12px] font-bakbak-one mx-auto mt-[13px] inline-block flex items-center justify-center gap-2">
              {isLoading && (
                <SpinnerCircularFixed
                  size={20}
                  thickness={180}
                  speed={300}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(255, 255, 255, 0.42)"
                />
              )}{" "}
              Send Report
            </button>
            <button
              type="button"
              onClick={() => {
                setReportOpen(false);
                reset();
                setStep(1);
              }}
              className="w-[158px] h-[37px] bg-[#202020] rounded-[10px] text-[#FFF] text-[12px] font-bakbak-one mx-auto mt-[9px] block cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="max-w-[324px] mx-auto w-full flex flex-col justify-center items-center h-full pb-[15px]">
            <span></span>
            <p className="text-[#FFF] text-[12px] font-bakbak-one mt-[120px]">
              Thank you for submitting your report. It will undergo a thorough
              review by our team of community moderators
            </p>

            <button
              type="button"
              onClick={() => {
                setReportOpen(false);
                reset();
                setStep(1);
              }}
              className="w-[158px] h-[37px] bg-[#FFF] rounded-[10px] text-[#202020] text-[12px] font-bakbak-one mx-auto mt-[81px] block cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default ReportDialog;
