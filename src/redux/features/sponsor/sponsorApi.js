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
    addNewTrendingSponsor: builder.mutation({
      query: ({ data }) => ({
        url: `/sponsors/create/new-trending`,
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

    //* for dashboard sponsor page
    getMainSponsors: builder.query({
      query: () => `/sponsors/main`,
      providesTags: ["sponsors"],
    }),
    getOfficialSponsors: builder.query({
      query: () => `/sponsors/official`,
      providesTags: ["sponsors"],
    }),
    getNewTrendingSponsors: builder.query({
      query: () => `/sponsors/new-trending`,
      providesTags: ["sponsors"],
    }),

    //*  for public page
    getMainSponsorsData: builder.query({
      query: () => `/sponsors/public/main`,
      providesTags: ["sponsors"],
    }),
    getOfficialSponsorsData: builder.query({
      query: () => `/sponsors/public/official`,
      providesTags: ["sponsors"],
    }),
    getNewTrendingSponsorsData: builder.query({
      query: () => `/sponsors/public/new-trending`,
      providesTags: ["sponsors"],
    }),
  }),
});

export const {
  useAddSponsorMutation,
  useAddNewTrendingSponsorMutation,

  //* */
  useGetMainSponsorsQuery,
  useGetOfficialSponsorsQuery,
  useGetNewTrendingSponsorsQuery,

  //* */
  useGetMainSponsorsDataQuery,
  useGetOfficialSponsorsDataQuery,
  useGetNewTrendingSponsorsDataQuery,

  //--------------
  useAddClickThroughMutation,
} = featuredApi;
