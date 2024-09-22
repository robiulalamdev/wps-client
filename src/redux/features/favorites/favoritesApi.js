import { api } from "../../api/apiSlice";

const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToFavorite: builder.mutation({
      query: ({ data }) => ({
        url: `/favorites/add-to-favorite`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["favorites"],
    }),

    removeFavorites: builder.mutation({
      query: ({ data }) => ({
        url: `/favorites/remove-my-favorites`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["favorites"],
    }),

    updateFavorites: builder.mutation({
      query: ({ data }) => ({
        url: `/favorites/update-my-favorites`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["favorites"],
    }),

    getMyFavorites: builder.query({
      query: () => `/favorites/my-favorites`,
      providesTags: ["favorites"],
    }),

    getMyProfileFavorites: builder.query({
      query: (userId) => `/favorites/my-profile-favorites/${userId}`,
      providesTags: ["favorites"],
    }),

    // get total favorites count
    getTotalFavorites: builder.query({
      query: (id) => `/favorites/total/${id}`,
      providesTags: ["favorites"],
    }),
  }),
});

export const {
  useAddToFavoriteMutation,
  useGetMyFavoritesQuery,
  useRemoveFavoritesMutation,
  useUpdateFavoritesMutation,
  useGetMyProfileFavoritesQuery,
  useGetTotalFavoritesQuery,
} = favoritesApi;
