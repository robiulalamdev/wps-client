import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Using Next.js Image for optimization

const WallpaperPage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const getData = async () => {
    fetch(
      `https://api.thewallpapersociety.com/api/v1/wallpapers/slug/faBHDZmPz`,
      {
        headers: {
          Authorization: `Bearer`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setData(data?.data);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const imagePath = data?.wallpaper
    ? `https://api.thewallpapersociety.com/api/v1/assets?path=${data?.wallpaper}&width=400&height=400`
    : "https://avatars.githubusercontent.com/u/105594633?v=4"; // fallback if no image

  return (
    <>
      <Head>
        <title>WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.</title>
        <link
          rel="canonical"
          href={`https://thewallpapersociety.com/w/${router.query.slug}`}
        />
        <meta
          name="description"
          content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        />
        <meta
          property="og:url"
          content={`https://thewallpapersociety.com/w/${router.query.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        />
        <meta
          property="og:description"
          content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        />
        <meta property="og:image" content={imagePath} />
        <meta property="og:image:secure_url" content={imagePath} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content={400} />
        <meta property="og:image:height" content={400} />
        <meta property="og:image:alt" content="WPS - Free 4K/HD Wallpaper" />
        <meta name="twitter:creator" content={data?.author_info?.username} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        />
        <meta
          name="twitter:description"
          content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        />
      </Head>

      <div>
        <h1>This is wallpaper page : {router.query.slug}</h1>
        <h1>Username : {data?.author_info?.username}</h1>
        <Image src={imagePath} alt="WPS Wallpaper" width={400} height={400} />
        <Image
          src="https://avatars.githubusercontent.com/u/105594633?v=4"
          alt="WPS Wallpaper"
          width={400}
          height={400}
        />
      </div>
    </>
  );
};

export default WallpaperPage;
