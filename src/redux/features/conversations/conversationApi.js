/* eslint-disable no-unused-vars */

import { api } from "../../api/apiSlice";
import { setChats } from "./conversationSlice";

const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ data }) => ({
        url: `/chats/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chats"],
    }),

    sendMessage: builder.mutation({
      query: ({ data }) => ({
        url: `/messages/create`,
        method: "POST",
        body: data,
      }),
    }),

    removeChatById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/chats/${id}`,
        method: "DELETE",
        body: data,
      }),
      // invalidatesTags: ["chats", "messages"],
    }),

    myChats: builder.query({
      query: () => `/chats/me`,
      providesTags: ["chats"],
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        dispatch(setChats(result?.data?.data));
      },
    }),

    getMessageByChatId: builder.query({
      query: (chatId) => `/messages/${chatId}`,
      providesTags: ["messages"],
    }),

    // dashboard messages for admin and moderator
    sendDamMessage: builder.mutation({
      query: ({ data }) => ({
        url: `/dam-messages/create`,
        method: "POST",
        body: data,
      }),
    }),
    removeDamMessages: builder.mutation({
      query: ({ data }) => ({
        url: `/dam-messages/remove`,
        method: "POST",
        body: data,
      }),
    }),

    getDamMessages: builder.query({
      query: (query) => `/dam-messages${query}`,
    }),
  }),
});

export const {
  useCreateChatMutation,
  useSendMessageMutation,
  useMyChatsQuery,
  useGetMessageByChatIdQuery,

  // DELETE
  useRemoveChatByIdMutation,

  //* dashboard
  useSendDamMessageMutation,
  useRemoveDamMessagesMutation,
  useGetDamMessagesQuery,
} = conversationApi;
