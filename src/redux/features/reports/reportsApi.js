import { api } from "../../api/apiSlice";
import { setTotalReports } from "./reportsSlice";

const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendReport: builder.mutation({
      query: ({ data }) => ({
        url: `/reports/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reports"],
    }),
    modifyReport: builder.mutation({
      query: ({ data, id }) => ({
        url: `/reports/modify/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reports"],
    }),

    getUserReports: builder.query({
      query: () => `/reports/user-reports`,
      providesTags: ["reports"],
    }),

    getRemovalRequests: builder.query({
      query: () => `/reports/removal-requests`,
      providesTags: ["reports"],
    }),

    getClaimRequests: builder.query({
      query: () => `/reports/claim-requests`,
      providesTags: ["reports"],
    }),

    getReviewedReports: builder.query({
      query: () => `/reports/reviewed`,
      providesTags: ["reports"],
    }),

    getTotalReports: builder.query({
      query: () => `/reports/total`,
      providesTags: ["reports"],
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        if (result?.data?.data) {
          dispatch(setTotalReports(result?.data?.data || 0));
        }
      },
    }),
  }),
});

export const {
  useSendReportMutation,
  useModifyReportMutation,
  useGetUserReportsQuery,
  useGetRemovalRequestsQuery,
  useGetClaimRequestsQuery,
  useGetReviewedReportsQuery,

  //* for dashboard
  useGetTotalReportsQuery,
} = reportsApi;
