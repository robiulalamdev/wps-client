import nookies from "nookies";

export const NODE_ENV = process.env.NODE_ENV;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const TOKEN_NAME = "wps";

export const SOCIAL_LINKS = {
  TIKTOK: "https://www.tiktok.com/@thewallpapersociety",
  TWITTER: "https://x.com/wallpsociety",
  DISCORD: "https://discord.gg/BkTyxthkr6",
  INSTAGRAM: "https://www.instagram.com/wallpsociety",
  REDDIT: "https://www.reddit.com/r/WallpaperSociety",
};

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
    secure: process.env.NODE_ENV === "production",
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

export const handleKeyboardShortcuts = (event, router) => {
  const key = event.key.toLowerCase(); // Normalize key to lowercase

  // Navigate to /dashboard on Ctrl + D (or Cmd + D)
  if ((event.ctrlKey || event.metaKey) && key === "d") {
    event.preventDefault(); // Prevent default behavior
    router.push("/dashboard");
  }

  // Navigate back on Ctrl + B (or Cmd + B)
  if ((event.ctrlKey || event.metaKey) && key === "b") {
    event.preventDefault(); // Prevent default behavior
    router.back();
  }

  // Navigate to home (/) on Ctrl + H (or Cmd + H)
  if ((event.ctrlKey || event.metaKey) && key === "h") {
    event.preventDefault(); // Prevent default behavior
    router.push("/");
  }
};
