/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const NoData = ({ title = "" }) => {
  return (
    <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px]">
      <h1 className="text-[#FFF] font-bakbak-one text-[11px] sm:text-[13px] md:text-base text-center">
        {title || "Data Not Found!"}
      </h1>
    </div>
  );
};

export default NoData;
