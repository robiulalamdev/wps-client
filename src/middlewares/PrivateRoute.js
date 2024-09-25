/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contextApi/AuthContext";
import PageLoading from "@/components/common/loadings/PageLoading";

const PrivateRoute = (WrappedComponent, Layout) => {
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

    const ComponentToRender = user ? <WrappedComponent {...props} /> : null;

    // Wrap with the specified layout
    if (!!ComponentToRender) {
      return Layout ? <Layout>{ComponentToRender}</Layout> : ComponentToRender;
    } else {
      return ComponentToRender;
    }
  };

  return WithAuthentication;
};

export default PrivateRoute;
