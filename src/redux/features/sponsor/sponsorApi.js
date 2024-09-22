// featured
import { api } from "../../api/apiSlice";

const featuredApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addSponsor: builder.mutation({
      query: ({ data }) => ({
        url: `/sponsors/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sponsors"],
    }),
    addClickThrough: builder.mutation({
      query: ({ data, id }) => ({
        url: `/sponsors/click-through/${id}`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["sponsors"],
    }),
    // getFeaturedData: builder.query({
    //   query: ({ targetType, type, limit = 6 }) =>
    //     `/featured?targetType=${targetType}&type=${type}&limit=${limit}`,
    //   providesTags: ["featured"],
    // }),
    getMainSponsors: builder.query({
      query: () => `/sponsors/main`,
      providesTags: ["sponsors"],
    }),
    getMainSponsorsData: builder.query({
      query: () => `/sponsors/public/main`,
      providesTags: ["sponsors"],
    }),
  }),
});

export const {
  useAddSponsorMutation,
  useGetMainSponsorsQuery,
  useGetMainSponsorsDataQuery,
  useAddClickThroughMutation,
} = featuredApi;
