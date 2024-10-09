/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CLIENT_URL } from "@/lib/config";
import Head from "next/head";

const MetaTags = ({
  title = "WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.",
  description = "WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.",
  image,
  largeImage,
  url = "https://thewallpapersociety.com",
  username = "",
  height = 400,
  width = 400,
  site_name = CLIENT_URL,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />

      {/* Og meta tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={width} />
      <meta property="og:image:height" content={height} />
      <meta property="og:image:alt" content="WPS - Free 4K/HD Wallpaper" />

      {/* for twitter */}
      <meta name="twitter:creator" content={username} />
      <meta data-rh="true" name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="WPS - Free 4K/HD Wallpaper" />

      {/* discord meta tags */}
      <meta name="discord:<blabla>" content={description} />

      {/* other */}
      <meta data-rh="true" name="charset" content="UTF8" />
      <meta
        data-rh="true"
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimal-ui"
      />
      <meta data-rh="true" name="mobile-web-app-capable" content="yes" />
      <meta data-rh="true" name="apple-mobile-web-app-capable" content="yes" />
      <meta data-rh="true" name="apple-mobile-web-app-title" content={title} />
      <meta data-rh="true" name="application-name" content={site_name} />
      <meta data-rh="true" name="author" content={username} />
      <meta data-rh="true" name="msapplication-TileColor" content="#ffffff" />
      <meta data-rh="true" name="msapplication-TileImage" content={image} />
      <meta data-rh="true" name="theme-color" content="#ffffff" />

      <meta data-rh="true" name="twitter:url" content={url} />
      <meta data-rh="true" name="twitter:image" content={image} />

      <meta data-rh="true" name="robots" content="max-image-preview:large" />
    </Head>
  );
};

export default MetaTags;
