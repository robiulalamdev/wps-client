import { useEffect } from "react";
import { NODE_ENV } from "../../../lib/config";

const DisabledUserAction = () => {
  useEffect(() => {
    if (NODE_ENV === "production") {
      const disableDevTools = (event) => {
        if (
          event.key === "F12" ||
          (event.ctrlKey && event.shiftKey && event.key === "I") ||
          (event.ctrlKey && event.shiftKey && event.key === "J") ||
          (event.ctrlKey && event.key === "U")
        ) {
          event.preventDefault();
        }
      };

      const disableRightClick = (event) => {
        event.preventDefault();
      };

      const disableCopy = (event) => {
        if (event.ctrlKey && event.key === "c") {
          event.preventDefault();
        }
      };

      const disableViewSource = (event) => {
        if (event.ctrlKey && event.key === "u") {
          event.preventDefault();
        }
      };

      const disablePrint = (event) => {
        if (event.ctrlKey && event.key === "p") {
          event.preventDefault();
        }
      };

      const disableOtherShortcuts = (event) => {
        if (
          (event.ctrlKey && event.key === "s") || // Ctrl + S
          (event.ctrlKey && event.key === "a") || // Ctrl + A
          (event.ctrlKey && event.shiftKey && event.key === "c") // Ctrl + Shift + C
        ) {
          event.preventDefault();
        }
      };

      document.addEventListener("keydown", disableDevTools);
      document.addEventListener("contextmenu", disableRightClick);
      document.addEventListener("keydown", disableCopy);
      document.addEventListener("keydown", disableViewSource);
      document.addEventListener("keydown", disablePrint);
      document.addEventListener("keydown", disableOtherShortcuts);

      return () => {
        document.removeEventListener("keydown", disableDevTools);
        document.removeEventListener("contextmenu", disableRightClick);
        document.removeEventListener("keydown", disableCopy);
        document.removeEventListener("keydown", disableViewSource);
        document.removeEventListener("keydown", disablePrint);
        document.removeEventListener("keydown", disableOtherShortcuts);
      };
    }
  }, []);
  return <div></div>;
};

export default DisabledUserAction;
