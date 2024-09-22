// featured
import { api } from "../../api/apiSlice";

const featuredApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedData: builder.query({
      query: ({ targetType, type, limit = 6 }) =>
        `/featured?targetType=${targetType}&type=${type}&limit=${limit}`,
      providesTags: ["featured"],
    }),
    featuredWallpaper: builder.query({
      query: () => `/featured/wallpaper`,
      providesTags: ["featured"],
    }),
    credentialFeatured: builder.query({
      query: () => `/featured/credentials`,
      providesTags: ["featured"],
    }),
    artistsFeatured: builder.query({
      query: () => `/featured/artists`,
      providesTags: ["featured"],
    }),
    brandsFeatured: builder.query({
      query: () => `/featured/brands`,
      providesTags: ["featured"],
    }),
    getPublicArtistsFeatured: builder.query({
      query: () => `/featured/public/artists`,
      providesTags: ["featured"],
    }),
    getPublicBrandFeatured: builder.query({
      query: () => `/featured/public/brands`,
      providesTags: ["featured"],
    }),

    // credentials
    getPublicCredentialFeaturedForLogin: builder.query({
      query: () => `/featured/public/credentials/login`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForSignup: builder.query({
      query: () => `/featured/public/credentials/signup`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForSignupCnf: builder.query({
      query: () => `/featured/public/credentials/signup-cnf`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForEv: builder.query({
      query: () => `/featured/public/credentials/ev`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForPcs: builder.query({
      query: () => `/featured/public/credentials/pcs`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForFp: builder.query({
      query: () => `/featured/public/credentials/fp`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForFe: builder.query({
      query: () => `/featured/public/credentials/fe`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForRp: builder.query({
      query: () => `/featured/public/credentials/rp`,
      providesTags: ["featured"],
    }),
    getPublicCredentialFeaturedForNp: builder.query({
      query: () => `/featured/public/credentials/np`,
      providesTags: ["featured"],
    }),
  }),
});

export const {
  useGetFeaturedDataQuery,
  useFeaturedWallpaperQuery,
  useCredentialFeaturedQuery,
  useArtistsFeaturedQuery,
  useBrandsFeaturedQuery,
  useGetPublicArtistsFeaturedQuery,
  useGetPublicBrandFeaturedQuery,

  // credentials
  useGetPublicCredentialFeaturedForLoginQuery,
  useGetPublicCredentialFeaturedForSignupQuery,
  useGetPublicCredentialFeaturedForSignupCnfQuery,
  useGetPublicCredentialFeaturedForEvQuery,
  useGetPublicCredentialFeaturedForPcsQuery,
  useGetPublicCredentialFeaturedForFpQuery,
  useGetPublicCredentialFeaturedForFeQuery,
  useGetPublicCredentialFeaturedForRpQuery,
  useGetPublicCredentialFeaturedForNpQuery,
} = featuredApi;
