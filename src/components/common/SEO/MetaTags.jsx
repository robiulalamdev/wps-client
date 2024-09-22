/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const MetaTags = ({
  title = "WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.",
  description = "WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.",
  image = "https://avatars.githubusercontent.com/u/105594633?v=4",
  url = "https://thewallpapersociety.com",
  username = "wps",
  height = 200,
  width = 200,
}) => {
  useEffect(() => {
    const metaTags = [
      {
        property: "og:image",
        content: "https://avatars.githubusercontent.com/u/105594633?v=4",
      },
      {
        property: "og:image:secure_url",
        content: "https://avatars.githubusercontent.com/u/105594633?v=4",
      },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "200" },
      { property: "og:image:alt", content: "robiulalamdev" },
    ];

    metaTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);

      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", tag.property);
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute("content", tag.content);
    });
  }, []);
  return (
    <></>
    // <Helmet>
    //   {/* Standard metadata tags */}
    //   <title>{title}</title>
    //   <link rel="canonical" href={window.location.href} />
    //   <meta name="description" content={description} />
    //   {/* Open Graph tags (OG) */}
    //   <meta property="og:url" content={window.location.href} />
    //   <meta property="og:type" content="website" />
    //   <meta property="og:title" content={title} />
    //   <meta property="og:description" content={description} />
    //   {/* OG image tags */}
    //   <meta property="og:image" content={image} />
    //   <meta property="og:image:secure_url" content={image} />
    //   <meta property="og:image:type" content="image/jpeg" />
    //   <meta property="og:image:width" content={width} />
    //   <meta property="og:image:alt" content={`WPS - Free 4K/HD Wallpaper`} />
    //   {/* Twitter tags */}
    //   <meta name="twitter:creator" content={username} />
    //   <meta name="twitter:card" content={description} />
    //   <meta name="twitter:title" content={title} />
    //   <meta name="twitter:description" content={description} />
    // </Helmet>
  );
};

export default MetaTags;
