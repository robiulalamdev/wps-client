import { api } from "../../api/apiSlice";

const collectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCollection: builder.mutation({
      query: ({ data }) => ({
        url: `/collections/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["collections"],
    }),

    removeCollectionsByIds: builder.mutation({
      query: ({ data }) => ({
        url: `/collections/remove-my-collections`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["collections"],
    }),

    updateCollections: builder.mutation({
      query: ({ data }) => ({
        url: `/collections/update-my-collections`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["collections"],
    }),

    toggleCollectionItem: builder.mutation({
      query: ({ data, id }) => ({
        url: `/collections/add-remove-wallpaper/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["collections"],
    }),

    getMyCollections: builder.query({
      query: () => `/collections/my-collections`,
      providesTags: ["collections"],
    }),

    getMyCollectionsByUserId: builder.query({
      query: (userId) => `/collections/my-profile-collections/${userId}`,
      providesTags: ["collections"],
    }),
    getCollectionListByUserId: builder.query({
      query: ({ userId, wallpaperId }) =>
        `/collections/list/${userId}/${wallpaperId}`,
      providesTags: ["collections"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetMyCollectionsQuery,
  useRemoveCollectionsByIdsMutation,
  useUpdateCollectionsMutation,
  useGetMyCollectionsByUserIdQuery,
  useGetCollectionListByUserIdQuery,
  useToggleCollectionItemMutation,
} = collectionsApi;
