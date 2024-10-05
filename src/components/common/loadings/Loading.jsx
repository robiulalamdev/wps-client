/* eslint-disable react/prop-types */
import spinner from "../../../assets/icons/global/loading/spinner.gif";

const Loading = ({ className = "", containerClassName = "" }) => {
  return (
    <div
      className={`w-full flex justify-center items-center h-full ${containerClassName}`}
    >
      <img
        src={spinner.src}
        alt=""
        className={`max-w-[288px] max-h-[288px] w-full object-contain ${className}`}
      />
    </div>
  );
};

export default Loading;
