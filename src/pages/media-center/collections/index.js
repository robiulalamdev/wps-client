import MediaCenterMain from "@/components/media-center/MediaCenterMain";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/middlewares/PrivateRoute";
import React from "react";

const CollectionsPage = () => {
  return (
    <>
      <MediaCenterMain pathname={"Collections"} />
    </>
  );
};

export default PrivateRoute(CollectionsPage, MainLayout);
