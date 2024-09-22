import ErrorPage from "@/components/ErrorPage/ErrorPage";
import NotFoundHeader from "@/components/shared/headers/NotFoundHeader";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-full">
      <NotFoundHeader />
      <ErrorPage />
    </div>
  );
};

export default NotFound;

NotFound.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
