import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TOKEN_NAME } from "../../lib/config";
import nookies from "nookies";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = `Bearer ${nookies.get()[TOKEN_NAME]}`;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "users",
    "wallpapers",
    "favorites",
    "collections",
    "helpers",
    "reports",
    "messages",
    "featured",
    "analytics",
    "verifications",
    "sponsors",
  ],
  endpoints: () => ({}),
});
