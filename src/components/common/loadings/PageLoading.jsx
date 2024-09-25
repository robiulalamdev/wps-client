import spinner from "../../../assets/icons/global/loading/spinner.gif";

const PageLoading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <img
        src={spinner.src}
        alt=""
        className="max-w-[288px] max-h-[288px] object-contain"
      />
    </div>
  );
};

export default PageLoading;
