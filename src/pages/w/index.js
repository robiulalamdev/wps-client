import Head from "next/head";
import React from "react";

const WallpaperPage = () => {
  return (
    <div>
      <Head>
        <title>Your Page Title</title>
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/105594633?v=4"
        />
        <meta
          property="og:image:secure_url"
          content="https://avatars.githubusercontent.com/u/105594633?v=4"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:alt" content="robiulalamdev" />
      </Head>
      <h1>This is wallpaper page</h1>
    </div>
  );
};

export default WallpaperPage;
