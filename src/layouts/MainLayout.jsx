import bg from "../assets/images/global/bg.png";
import Footer from "../components/shared/Footers/Footer";
import EndFooter from "../components/shared/Footers/EndFooter";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const MainLayout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society.</title>
        <meta
          name="description"
          content="WPS - Free 4K/HD Wallpapers, Ad-Free. Join the Society."
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-785BWEHDHD"
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || []; 
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date()); 

  gtag('config', 'G-785BWEHDHD');`}
        </script>
      </Head>
      <div
        className="h-full min-h-screen w-full overflow-y-auto"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div>
          <div className="bg-transparent w-full h-full max-w-[430px] md:max-w-theme mx-auto px-[12px] md:px-[25px] lg:px-[40px] xl:px-[55px] 2xl:px-[75px]">
            {children}
            <Footer />
          </div>
          <EndFooter />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
