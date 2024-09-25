import ProfileMain from "../../components/profile/ProfileMain";
import { useGetPublicUserInfoQuery } from "../../redux/features/users/usersApi";
import PageLoading from "../../components/common/loadings/PageLoading";
import ErrorPageMain from "../../components/common/errorPages/ErrorPageMain";
import OfficialBrandProfileMain from "../../components/officialBrandProfile/OfficialBrandProfileMain";
import { BASE_URL, CLIENT_URL, ROLE_DATA, TOKEN_NAME } from "../../lib/config";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";
import MetaTags from "@/components/common/SEO/MetaTags";
import useViewImage from "@/lib/hooks/useViewImage";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const cookies = nookies.get(context);
  const token = cookies[TOKEN_NAME];

  const res = await fetch(`${BASE_URL}/users/profile/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return {
    props: {
      userData: data || null,
    },
  };
}

const PublicProfile = ({ userData }) => {
  const { viewResizeImg } = useViewImage();
  const router = useRouter();
  const [data, setData] = useState(userData?.data || null);
  const { slug } = router.query?.slug;
  const { data: reduxData, isLoading } = useGetPublicUserInfoQuery(slug);
  // console.log(data);

  useEffect(() => {
    if (reduxData?.data?._id) {
      setData(reduxData?.data);
    }
  }, [reduxData]);

  return (
    <>
      <MetaTags
        title={`${data?.username}'s Wallpaper Haven: Discover High-Quality Images on WPS`}
        description={`Explore ${data?.username}'s collection of stunning wallpapers on WPS. Enjoy ad-free browsing and join our community of image enthusiasts.`}
        image={
          data?.profile?.profile_image
            ? viewResizeImg(data?.profile?.profile_image, 400, 400)
            : viewResizeImg(data?.profile?.banner, 400, 400)
        }
        url={`${CLIENT_URL}/profiles/${slug}`}
        username={data?.username}
        width={400}
        height={400}
      />
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          {data ? (
            <>
              {data?.role === ROLE_DATA.BRAND ? (
                <OfficialBrandProfileMain user={data} />
              ) : (
                <ProfileMain user={data} />
              )}
            </>
          ) : (
            <ErrorPageMain showHeader={true} />
          )}
        </>
      )}
    </>
  );
};

export default PublicProfile;

PublicProfile.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
