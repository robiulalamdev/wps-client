import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const slug = context.params.slug; // Get slug from URL
  const res = await fetch(
    `https://api.thewallpapersociety.com/api/v1/wallpapers/slug/${slug}`,
    {
      headers: {
        Authorization: `Bearer`,
      },
    }
  );
  const data = await res.json();

  return {
    props: {
      wallpaperData: data?.data || null, // Pass fetched data to the component
    },
  };
}

const WallpaperPage = ({ wallpaperData }) => {
  const router = useRouter();
  const wallpaperUrl = `https://api.thewallpapersociety.com/api/v1/assets?path=${wallpaperData?.wallpaper}&width=400&height=400`;

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
        <meta property="og:image" content={wallpaperUrl} />
        <meta property="og:image:secure_url" content={wallpaperUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content={400} />
        <meta property="og:image:height" content={400} />
        <meta property="og:image:alt" content="WPS - Free 4K/HD Wallpaper" />
        <meta
          name="twitter:creator"
          content={wallpaperData?.author_info?.username}
        />
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
        <h1>Wallpaper Page</h1>
        <h2>Username: {wallpaperData?.author_info?.username}</h2>
        {wallpaperData && (
          <Image
            src={wallpaperUrl}
            alt="Wallpaper"
            width={400}
            height={400}
            // layout="responsive"
          />
        )}
      </div>
    </>
  );
};

export default WallpaperPage;

WallpaperPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
