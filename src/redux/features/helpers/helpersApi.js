import { api } from "../../api/apiSlice";

const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMail: builder.mutation({
      query: ({ data }) => ({
        url: `/helpers/send-message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["helpers"],
    }),
  }),
});

export const { useSendContactMailMutation } = favoritesApi;
