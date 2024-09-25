import nookies from "nookies";

export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const TOKEN_NAME = "wps";
export const ACCEPT_FILES = {
  PROOF_OF_IDENTITY: ".png, .jpg, .jpeg, .doc, .pdf",
};

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const ROLE_DATA = {
  ADMIN: "Admin",
  USER: "User",
  MOD: "Mod",
  BRAND: "Brand",
  ARTIST: "Artist",
};

export const REPORT_TYPES = {
  REMOVAL_REQUEST: "Removal Request",
  CLAIM_REQUEST: "Claim Request",
  USER_REPORT: "User Report",
};

export const SET_TOKEN = async (etx = null, token) => {
  nookies.set(etx, TOKEN_NAME, token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/", // Available throughout the app
    httpOnly: false, // Ensure it's not accessible via client-side JS
    secure: NODE_ENV === "production",
  });
};

export const DELETE_TOKEN = (ctx = null) => {
  nookies.destroy(ctx, TOKEN_NAME, {
    path: "/",
  });
};

export const FIELD_VALIDATIONS = {
  USERNAME_VALIDATION: {
    pattern: {
      value: /^[^\s]+$/,
      message: "Username cannot contain spaces or multiple words",
    },
    maxLength: {
      value: 15,
      message: "Username cannot exceed 15 characters",
    },
  },
};
