/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Head from "next/head";

const MetaTags = ({
  title = "WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.",
  description = "WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.",
  image = "https://avatars.githubusercontent.com/u/105594633?v=4",
  url = "https://thewallpapersociety.com",
  username = "",
  height = 200,
  width = 200,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
      />
      <meta
        property="og:description"
        content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
      />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={400} />
      <meta property="og:image:height" content={400} />
      <meta property="og:image:alt" content="WPS - Free 4K/HD Wallpaper" />

      {/* for twitter */}
      <meta name="twitter:creator" content={username} />
      <meta
        name="twitter:card"
        content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
      />
      <meta
        name="twitter:title"
        content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
      />
      <meta
        name="twitter:description"
        content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
      />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default MetaTags;
