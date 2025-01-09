import MainLayout from "@/layouts/MainLayout";
import FeaturedArtists from "../components/home/FeaturedArtists/FeaturedArtists";
import FeaturedWallpapers from "../components/home/FeaturedWallpapers/FeaturedWallpapers";
import Sponsor from "../components/home/Sponsor/Sponsor";
import WPSStaffPicks from "../components/home/WPSStaffPicks/WPSStaffPicks";
import Banner from "../components/home/banner/Banner";
import OfficialWallpapers from "../components/home/officialWallpapers/OfficialWallpapers";
import MainHeader from "../components/shared/headers/MainHeader";
import MetaTags from "@/components/common/SEO/MetaTags";
import useViewImage from "@/lib/hooks/useViewImage";
import { CLIENT_URL } from "@/lib/config";

export default function Home() {
  const { viewResizeImg } = useViewImage();
  return (
    <>
      <MetaTags
        title="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        description="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society. Explore this stunning Neon Retro wallpaper featuring vibrant purple ferns. Perfect for a high-definition setup!"
        image={viewResizeImg("src/assets/images/card.jpg", 600, 600)}
        url={CLIENT_URL}
        // username=""
        width={200}
        height={200}
      />
      <MainHeader />
      <Banner />
      <OfficialWallpapers />
      <FeaturedWallpapers />
      <FeaturedArtists />
      <WPSStaffPicks />
      <Sponsor />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
