import React, { useEffect, useState } from "react";
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";
import WallpaperZoomInOut from "./WallpaperZoomInOut";

const ZoomWallpaper = ({ data = null, user }) => {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 1));
  };

  const resetZoom = () => {
    setScale(1); // Reset to original size
  };

  // Ensure the component only renders after the client-side mounting phase.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null during server-side rendering.
  }
  return (
    <>
      {data?.screen_type !== "Phones" && (
        <LazyWallpaper
          src={data?.wallpaper}
          alt={data?.wallpaper}
          maxWidth={1420}
          maxHeight={820}
          width={3645}
          height={2070}
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.3s ease",
            maxWidth: "100%",
          }}
          className={`w-full h-full min-h-[755px] lg:min-h-[802px] object-cover rounded-[10px] transition-transform duration-300`}
        />
      )}

      {data?.screen_type === "Phones" && (
        <LazyWallpaper
          src={data?.wallpaper}
          alt={data?.wallpaper}
          maxWidth={450}
          maxHeight={820}
          width={1462.5}
          height={2070}
          resizeMode="contain"
          className="2xl:ml-[310px] mx-auto w-full max-w-[448px] h-full min-h-[755px] lg:min-h-[802px] lg:max-h-[802px] object-cover rounded-[10px] transition-transform duration-300"
        />
      )}
      <WallpaperZoomInOut
        user={user}
        resetZoom={resetZoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
      {/* <TransformWrapper
        doubleClick={{ disabled: false }}
        smooth={true}
        disabled={true}
      >
        <>
          <WallpaperZoomInOut user={user} />
          <TransformComponent
            wrapperStyle={{
              cursor: "grab",
              width: "100%",
            }}
            contentStyle={{ width: "100%" }}
          >
            {data?.screen_type !== "Phones" && (
              <LazyWallpaper
                src={data?.wallpaper}
                alt={data?.wallpaper}
                maxWidth={1420}
                maxHeight={820}
                width={3645}
                height={2070}
                className="w-full h-full min-h-[755px] lg:min-h-[802px] object-cover rounded-[10px]"
              />
            )}

            {data?.screen_type === "Phones" && (
              <LazyWallpaper
                src={data?.wallpaper}
                alt={data?.wallpaper}
                maxWidth={450}
                maxHeight={820}
                width={1462.5}
                height={2070}
                className="2xl:ml-[310px] mx-auto w-full max-w-[448px] h-full min-h-[755px] lg:min-h-[802px] lg:max-h-[802px] object-cover rounded-[10px]"
              />
            )}
          </TransformComponent>
        </>
      </TransformWrapper> */}
    </>
  );
};

export default ZoomWallpaper;
