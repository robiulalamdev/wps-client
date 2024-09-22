import { api } from "../../api/apiSlice";

const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    trackingVisitor: builder.mutation({
      query: ({ data }) => ({
        url: `/analytics/tracking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["analytics"],
    }),

    getDashboardAnalytics: builder.query({
      query: (query = "") => `/analytics${query}`,
      providesTags: ["analytics", "wallpapers", "users"],
    }),
  }),
});

export const { useTrackingVisitorMutation, useGetDashboardAnalyticsQuery } =
  analyticsApi;
