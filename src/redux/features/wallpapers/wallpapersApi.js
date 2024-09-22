import { api } from "../../api/apiSlice";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createWallpapers: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/create-wallpapers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    updateWallpapers: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/updates`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    deleteWallpapersByIds: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/deletes`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    updateTagById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/wallpapers/update-tags/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    incrementWallView: builder.mutation({
      query: ({ data, wallpaperId }) => ({
        url: `/wallpapers/view-increment/${wallpaperId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    incrementWallDownload: builder.mutation({
      query: ({ data, wallpaperId }) => ({
        url: `/wallpapers/download-inc/${wallpaperId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getWallpapers: builder.query({
      query: () => `/wallpapers`,
      providesTags: ["wallpapers"],
    }),

    getMyDraftWallpapers: builder.query({
      query: (query) => `/wallpapers/my-draft${query}`,
      providesTags: ["wallpapers"],
    }),

    getMyPublishedWallpapers: builder.query({
      query: (query) => `/wallpapers/my-published${query}`,
      providesTags: ["wallpapers"],
    }),

    getSearchWallpapers: builder.query({
      query: (query = "") => `/wallpapers/public${query}`,
      providesTags: ["wallpapers"],
    }),

    // search-all
    getSearchAndFilterWallpapers: builder.query({
      query: (query = "") => `/wallpapers/search-all${query}`,
      providesTags: ["wallpapers"],
    }),

    getWallpaperBySlug: builder.query({
      query: (slug) => `/wallpapers/slug/${slug}`,
      providesTags: ["wallpapers"],
    }),

    getWallpapersByUserId: builder.query({
      query: (userId) => `/wallpapers/profile-wallpapers/${userId}`,
      providesTags: ["wallpapers"],
    }),

    getPopularWallpapers: builder.query({
      query: (query) => `/wallpapers/popular${query}`,
      providesTags: ["wallpapers"],
    }),

    getFeaturedWallpapers: builder.query({
      query: () => `/wallpapers/featured`,
      providesTags: ["wallpapers"],
    }),

    getOfficialWallpapers: builder.query({
      query: (query) => `/wallpapers/official${query}`,
      providesTags: ["wallpapers"],
    }),

    getPopularTags: builder.query({
      query: () => `/wallpapers/popular-tags`,
      providesTags: ["wallpapers"],
    }),

    getWallpapersByTag: builder.query({
      query: ({ tag, page }) => `/wallpapers/tags/${tag}?page=${page}`,
      providesTags: ["wallpapers"],
    }),

    ///* dashboard
    sponsorsWallpapers: builder.query({
      query: (query) => `/wallpapers/sponsors${query}`,
      providesTags: ["wallpapers"],
    }),
    getFeaturedItems: builder.query({
      query: () => `/wallpapers/featured/items`,
      providesTags: ["wallpapers"],
    }),

    addMediaWallpaper: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/add-media`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    updateMediaWallpapers: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/update-media-wallpaper`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    deleteMediaWallpapersByIds: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/deletes-media`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    updateMediaWallTagById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/wallpapers/media/update-tags/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),

    addFeaturedItems: builder.mutation({
      query: ({ data }) => ({
        url: `/wallpapers/add-featured`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wallpapers"],
    }),
    getInfoBySlug: builder.mutation({
      query: ({ data, slug }) => ({
        url: `/wallpapers/media-info/${slug}`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["wallpapers"],
    }),

    addFeatured: builder.mutation({
      query: ({ data }) => ({
        url: `/featured/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["featured"],
    }),

    getContactFeatured: builder.query({
      query: () => `/featured/contact`,
      providesTags: ["featured"],
    }),

    getStaffFeatured: builder.query({
      query: () => `/featured/staff`,
      providesTags: ["featured"],
    }),

    getTopThreeFavorites: builder.query({
      query: () => `/wallpapers/top-three/favorite`,
      providesTags: ["favorites"],
    }),

    getMostDownloaded: builder.query({
      query: () => `/wallpapers/most-downloaded`,
      providesTags: ["wallpapers"],
    }),

    getTopCategories: builder.query({
      query: () => `/wallpapers/top-categories`,
      providesTags: ["wallpapers"],
    }),
  }),
});

export const {
  useCreateWallpapersMutation,
  useGetWallpapersQuery,

  useGetMyDraftWallpapersQuery,
  useGetMyPublishedWallpapersQuery,

  useGetSearchWallpapersQuery,
  useUpdateWallpapersMutation,
  useDeleteWallpapersByIdsMutation,
  useGetWallpaperBySlugQuery,
  useGetWallpapersByUserIdQuery,
  useGetPopularWallpapersQuery,
  useGetFeaturedWallpapersQuery,
  useGetOfficialWallpapersQuery,

  // advance search and filter
  useGetSearchAndFilterWallpapersQuery,

  // for search
  useGetPopularTagsQuery,
  useGetWallpapersByTagQuery,

  // PATCH
  useUpdateTagByIdMutation,
  useIncrementWallViewMutation,
  useIncrementWallDownloadMutation,

  // Dashboard */
  useSponsorsWallpapersQuery,
  useGetFeaturedItemsQuery,
  useAddMediaWallpaperMutation,
  useUpdateMediaWallpapersMutation,
  useDeleteMediaWallpapersByIdsMutation,
  useUpdateMediaWallTagByIdMutation,
  useAddFeaturedItemsMutation,
  useGetInfoBySlugMutation,
  useGetMostDownloadedQuery,
  useGetTopCategoriesQuery,

  // favorites
  useGetTopThreeFavoritesQuery,

  // featured
  useAddFeaturedMutation,
  useGetContactFeaturedQuery,
  useGetStaffFeaturedQuery,
} = usersApi;
