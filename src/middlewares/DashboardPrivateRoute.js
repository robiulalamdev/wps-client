/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import PageLoading from "../components/common/loadings/PageLoading";
import { useRouter } from "next/router";

const DashboardPrivateRoute = (allowedRoles = [], WrappedComponent, Layout) => {
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
      !allowedRoles.some((role) => role === user?.role)
    ) {
      router.push("/auth/login");
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

    // Wrap with the specified layout
  };

  return WithAuthentication;
};

export default DashboardPrivateRoute;
