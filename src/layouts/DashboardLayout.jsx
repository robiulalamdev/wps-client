import DashSidebar from "../components/dashboard-components/DashboradSharedComponents/DashSidebar";
import { useGetTotalReportsQuery } from "../redux/features/reports/reportsApi";
import { useGetTotalRequestsQuery } from "../redux/features/verification/verificationApi";
import Head from "next/head";

const DashboardLayout = ({ children }) => {
  const data = useGetTotalReportsQuery();
  const total = useGetTotalRequestsQuery();
  return (
    <>
      <Head>
        <title>WPS - Dashboard</title>
        <meta name="description" content="WPS - Dashboard" />

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
      <div className="bg-dash-bg !p-[8px_16px_19px_7px] h-screen max-h-screen w-full flex justify-between gap-x-[18px]">
        <DashSidebar />
        <div className="flex-grow max-w-[1594px] mx-auto w-full h-full overflow-y-auto overflow-x-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
