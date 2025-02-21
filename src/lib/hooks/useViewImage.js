import { BASE_URL } from "../config";

const useViewImage = () => {
  const viewImg = (img) => {
    if (img) {
      if (img instanceof File && img.type.startsWith("image/")) {
        return URL.createObjectURL(
          new Blob([img], { type: "application/octet-stream" })
        );
      } else {
        if (img?.startsWith("http")) {
          return img;
        } else {
          return `${BASE_URL}/uploads/${img}`;
        }
      }
    }
  };

  const viewResizeImg = (path, width, height, fit = "") => {
    if (path) {
      if (path instanceof File && path.type.startsWith("image/")) {
        return URL.createObjectURL(
          new Blob([path], { type: "application/octet-stream" })
        );
      } else {
        if (path?.startsWith("http")) {
          return path;
        } else {
          if (path) {
            return `${BASE_URL}/assets?path=${encodeURIComponent(path)}${
              width ? `&width=${width}` : ""
            }${height ? `&height=${height}` : ""}${fit ? `&fit=${fit}` : ""}`;
          }
        }
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return { viewImg, formatFileSize, viewResizeImg };
};

export default useViewImage;
