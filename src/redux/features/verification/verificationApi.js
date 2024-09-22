import { api } from "../../api/apiSlice";
import { setTotalRequests } from "./verificationSlice";

const verificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendVerification: builder.mutation({
      query: ({ data }) => ({
        url: `/verifications/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["verifications", "users"],
    }),
    modifyVerification: builder.mutation({
      query: ({ data, id }) => ({
        url: `/verifications/modify/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["verifications", "users"],
    }),

    getVerifications: builder.query({
      query: () => `/verifications`,
      providesTags: ["verifications"],
    }),

    getReviewedVerifications: builder.query({
      query: () => `/verifications/reviewed`,
      providesTags: ["verifications"],
    }),

    getTotalRequests: builder.query({
      query: () => `/verifications/total-requests`,
      providesTags: ["verifications"],
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        if (result?.data?.data) {
          dispatch(setTotalRequests(result?.data?.data || 0));
        }
      },
    }),
  }),
});

export const {
  useSendVerificationMutation,
  useModifyVerificationMutation,
  useGetVerificationsQuery,
  useGetReviewedVerificationsQuery,
  useGetTotalRequestsQuery,
} = verificationApi;
