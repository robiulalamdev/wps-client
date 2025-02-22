/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthContext";
import ProfileMain from "../../components/profile/ProfileMain";
import OfficialBrandProfileMain from "../../components/officialBrandProfile/OfficialBrandProfileMain";
import { ROLE_DATA } from "../../lib/config";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/middlewares/PrivateRoute";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.role === ROLE_DATA.BRAND ? (
        <OfficialBrandProfileMain user={user} />
      ) : (
        <ProfileMain user={user} />
      )}
    </>
  );
};

export default PrivateRoute(Profile, MainLayout);
