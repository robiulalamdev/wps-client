/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { AuthContext } from "./AuthContext";
// import { SOCKET_URL } from "../lib/config";
// import { useDispatch } from "react-redux";
// import { setVisitors } from "../redux/features/global/globalSlice";

export const SocketContext = createContext();

// export const socket = io.connect(SOCKET_URL, {
//   credentials: true,
// });
const SocketProvider = ({ children }) => {
  // const { user } = useContext(AuthContext);
  const [socketUsers, setSocketUsers] = useState(new Map());
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   socket.current = io.connect(SOCKET_URL, {
  //     credentials: true,
  //   });
  //   if (!user) {
  //     socket.current.emit("publicUser", {});
  //   }

  //   setInterval(() => {
  //     if (user && user._id) {
  //       socket.current.emit("addUser", { id: user?._id, role: user?.role });
  //     }
  //   }, 10000);

  //   socket.current.on("getUsers", (users) => {
  //     const usersMap = new Map();
  //     users?.users.forEach((user) => {
  //       usersMap.set(user.userId, user);
  //     });
  //     setSocketUsers(usersMap);
  //     dispatch(setVisitors(users));
  //   });

  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, [user]);

  const contextValue = {
    // SOCKET: socket,
    socketUsers,
  };
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
