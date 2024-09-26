/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import PageLoading from "../components/common/loadings/PageLoading";
import { ROLE_DATA } from "../lib/config";
import { useRouter } from "next/router";

const VerifyApprovedPrivateRoute = (WrappedComponent, Layout) => {
  const WithAuthentication = (props) => {
    const { user, isLoading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/auth/login");
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return <PageLoading />;
    }

    if (
      isLoading === false &&
      user?.verification_status === true &&
      (user?.role === ROLE_DATA.BRAND || user?.role === ROLE_DATA.ARTIST)
    ) {
      return router.back();
    } else {
      const ComponentToRender = user ? <WrappedComponent {...props} /> : null;
      if (!!ComponentToRender) {
        return Layout ? (
          <Layout>{ComponentToRender}</Layout>
        ) : (
          ComponentToRender
        );
      } else {
        return ComponentToRender;
      }
    }
  };

  return WithAuthentication;
};
export default VerifyApprovedPrivateRoute;
