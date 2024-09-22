const SeenOverlay = () => {
  return (
    <div
      className="absolute top-0 bottom-0 right-0 w-full h-full flex justify-center items-center cursor-pointer"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.90) 100%)",
      }}
    >
      <h1 className="text-white font-khorla text-[15px] md:text-[20px] leading-normal font-normal">
        Seen
      </h1>
    </div>
  );
};

export default SeenOverlay;
