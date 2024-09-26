import MediaCenterMain from "@/components/media-center/MediaCenterMain";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/middlewares/PrivateRoute";
import React from "react";

const FavoritesPage = () => {
  return (
    <>
      <MediaCenterMain pathname={"Favorites"} />
    </>
  );
};

export default PrivateRoute(FavoritesPage, MainLayout);
