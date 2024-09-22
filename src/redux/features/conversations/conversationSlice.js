import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  chat: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },

    setLastMessage: (state, action) => {
      const { chatId } = action.payload;
      const chats = state.chats.map((chat) => ({ ...chat }));
      const existingIndex = chats.findIndex((chat) => chat._id === chatId);

      if (existingIndex !== -1) {
        chats[existingIndex].lastMessage = action.payload;
        const updatedChat = chats.splice(existingIndex, 1)[0];
        chats.unshift(updatedChat);
        state.chats = chats;
      }
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessagePush: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  setChats,
  setChat,
  setMessages,
  setLastMessage,
  setMessagePush,
} = conversationSlice.actions;

export default conversationSlice.reducer;
