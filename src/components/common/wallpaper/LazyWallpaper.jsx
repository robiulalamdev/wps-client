/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import useViewImage from "../../../lib/hooks/useViewImage";
import Image from "next/image";

const LazyWallpaper = ({
  className,
  src = "",
  alt = "",
  title = "wallpaper",
  maxWidth,
  maxHeight,
  width = "",
  height,
  resizeMode = "",
  imgWidth = "",
  imgHeight = "",
}) => {
  const { viewResizeImg } = useViewImage();
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error("Error loading image:", src);
    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      {!inView && (
        <div
          ref={placeholderRef}
          className={`w-full h-full flex items-center justify-center bg-[#00000033] skeleton-loader overflow-hidden ${className}`}
        >
          <svg
            className="w-[28px] h-[28px] md:w-10 md:h-10 text-[#00000033] animate-pulse"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      )}
      {inView && (
        <>
          {isLoading && (
            <div
              className={`w-full h-full flex items-center justify-center bg-[#00000033] skeleton-loader ${className}`}
            >
              <svg
                className="w-[28px] h-[28px] md:w-10 md:h-10 text-[#00000033] animate-pulse"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          )}
          <div
            style={{
              width: imgWidth || "100%",
              height: imgHeight || "100%",
              ...(maxWidth && { maxWidth: maxWidth }),
              ...(maxHeight && { maxHeight: maxHeight }),
            }}
          >
            <Image
              src={viewResizeImg(src, width, height, resizeMode || "")}
              alt=""
              // alt={alt}
              loading="lazy"
              // title={title}
              layout="fill"
              className={`${className} ${isLoading && "!absolute opacity-0"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}

              //   width={imgWidth || "100%"}
              // height={imgHeight || "100%"}
              // style={
              //   (maxWidth && { maxWidth: maxWidth },
              //   maxHeight && { maxHeight: maxHeight })
              // }
            />
          </div>
        </>
      )}
    </>
  );
};

export default LazyWallpaper;
