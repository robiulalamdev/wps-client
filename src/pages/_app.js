import AuthProvider from "@/contextApi/AuthContext";
import SocketProvider from "@/contextApi/SocketContext";
import store from "@/redux/store";
import "@/styles/globals.css";
import "@/styles/contact.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const customTheme = {};
  return (
    <ThemeProvider value={customTheme}>
      <Provider store={store}>
        <AuthProvider>
          <SocketProvider>
            <ToastContainer
              position="top-right"
              autoClose={1200}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              style={{ zIndex: "999999999999999" }}
            />
            {getLayout(<Component {...pageProps} />)}
          </SocketProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
