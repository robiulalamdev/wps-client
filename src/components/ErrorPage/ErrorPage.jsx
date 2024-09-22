import notFound from "../../assets/images/global/notFoundLg.png";
import notFoundSm from "../../assets/images/global/notFoundSm.png";

const ErrorPage = () => {
  return (
    <>
      <div
        className="w-full max-h-[846px] h-[846px] rounded-[5px] px-[75px] py-[83px] md:flex items-end mt-[16px] hidden md:block"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${notFound.src}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="">
          <h1 className="text-white font-khorla text-[50px] leading-normal font-normal !p-0 !m-0">
            You drifted away.
          </h1>
          <h1 className="text-white font-khorla text-[50px] leading-normal font-normal !p-0 !m-0">
            This page could not be found.
          </h1>
        </div>
      </div>
      <div
        className="w-full max-h-[800px] h-[800px] rounded-[5px] px-[25px] py-[42px] flex items-end mt-[16px] md:hidden"
        style={{
          background: `url(${notFoundSm.src}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="">
          <h1 className="text-white font-khorla text-[25px] leading-normal font-normal !p-0 !m-0">
            You drifted away.
          </h1>
          <h1 className="text-white font-khorla text-[25px] leading-normal font-normal !p-0 !m-0">
            This page could not be found.
          </h1>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
