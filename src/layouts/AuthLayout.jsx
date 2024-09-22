import bg from "../assets/images/global/bg.png";
import AuthHeader from "../components/shared/headers/AuthHeader";
import Head from "next/head";

const AuthLayout = ({ children }) => {
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
        className="h-screen w-full overflow-y-auto"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="bg-transparent w-full h-full max-w-[430px] md:max-w-theme mx-auto px-[12px] md:px-[25px] lg:px-[40px] xl:px-[55px] 2xl:px-[75px]">
          <AuthHeader />
          {children}
          <br />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
