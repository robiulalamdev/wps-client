/* eslint-disable react/prop-types */

import { createContext, useEffect, useMemo, useState } from "react";
import {
  DELETE_TOKEN,
  handleKeyboardShortcuts,
  TOKEN_NAME,
} from "../lib/config";
import { useGetUserQuery } from "../redux/features/users/usersApi";
import { useTrackingVisitorMutation } from "../redux/features/analytics/analyticsApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data, refetch, isLoading } = useGetUserQuery();
  const [trackingVisitor] = useTrackingVisitorMutation();
  const router = useRouter();

  const [user, setUser] = useState(null);

  useMemo(() => {
    if (data?.success && data?.data?._id) {
      setUser(data?.data);
    }
  }, [data]);

  const logout = async () => {
    // localStorage.removeItem(TOKEN_NAME);
    DELETE_TOKEN();
    setUser(null);
  };

  const handleTrackingAction = async () => {
    const currentDate = new Date();

    // Define the start and end of today
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    const vTrack = Cookies.get("vTrack");

    // Check if vTrack is already set for today
    if (vTrack) {
      const vTrackDate = new Date(parseInt(vTrack, 10));

      if (vTrackDate >= startDate && vTrackDate < endDate) {
        // console.log("Already tracked for today");
        return;
      }
    }

    const options = {
      data: {},
    };
    const result = await trackingVisitor(options);
    if (result?.data?.success) {
      Cookies.set("vTrack", Date.now());
    }
  };

  useEffect(() => {
    handleTrackingAction();
    return () => {
      return;
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) =>
      handleKeyboardShortcuts(event, router, user);
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router, user]);

  const contextValue = {
    user,
    setUser,
    refetch,
    isLoading: isLoading,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
