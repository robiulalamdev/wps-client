import { BASE_URL, TOKEN_NAME } from "../config";
import { toast } from "react-toastify";
import axios from "axios";
import { debounce } from "lodash";
import nookies from "nookies";

export const getImageDimensions = (image) => {
  return new Promise((resolve, reject) => {
    let imageUrl = "";
    if (image) {
      if (image instanceof File && image.type.startsWith("image/")) {
        imageUrl = URL.createObjectURL(
          new Blob([image], { type: "application/octet-stream" })
        );
      } else {
        if (image?.startsWith("http")) {
          imageUrl = image;
        } else {
          imageUrl = `${BASE_URL}/uploads/${image}`;
        }
      }
    } else {
      reject(new Error("Invalid image input"));
    }

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const size = blob.size;
        const img = new Image();
        img.onload = () => {
          resolve({
            size: size,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
        img.src = imageUrl;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// download image with width and height
export const downloadImageWithWH = async (imageUrl, fileName = "download") => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urlBlob;

    // Extract the file name from the URL

    link.download = fileName; // Use the file name extracted from the URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    window.URL.revokeObjectURL(urlBlob);
    return { success: true };
  } catch (error) {
    toast.error("Error downloading");
    return { success: false, error: error?.message };
  }
};

// export const downloadImageWithWH = async (imageUrl, width, height) => {
//   try {
//     const img = await loadImage(imageUrl);

//     // Create an offscreen canvas for the source image
//     const srcCanvas = document.createElement("canvas");
//     srcCanvas.width = img.width;
//     srcCanvas.height = img.height;
//     const srcCtx = srcCanvas.getContext("2d");
//     srcCtx.drawImage(img, 0, 0);

//     // Create a destination canvas for the resized image
//     const destCanvas = document.createElement("canvas");
//     destCanvas.width = width;
//     destCanvas.height = height;

//     const picaInstance = pica();
//     await picaInstance.resize(srcCanvas, destCanvas, {
//       quality: 3, // Highest quality setting
//       alpha: true,
//     });

//     destCanvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "downloaded-image.png";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }, "image/png");
//     return { success: true };
//   } catch (error) {
//     toast.error("Error downloading");
//     return { success: false, error: error?.message };
//   }
// };

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = src;
  });
};

export const makeQuery = async (
  name,
  value,
  queryObject,
  isDimensions = false,
  isDelete = false
) => {
  // Create a copy of the queryObject to avoid mutating the original object
  const updatedQueryObject = { ...queryObject };
  // Conditionally update or delete the specified query parameter
  if (isDelete) {
    if (isDimensions) {
      delete updatedQueryObject["width"];
      delete updatedQueryObject["height"];
    } else {
      delete updatedQueryObject[name];
    }
  } else {
    updatedQueryObject[name] = value;
  }
  // console.log(updatedQueryObject);

  // Build the query string from the updated query object, excluding empty values
  const newQuery = Object.keys(updatedQueryObject)
    .filter(
      (key) =>
        updatedQueryObject[key] !== undefined && updatedQueryObject[key] !== ""
    )
    .map((key) => `${key}=${updatedQueryObject[key]}`)
    .join("&");

  return newQuery;
};

export function validateImageSize(imageFile, maxSizeMB) {
  const MAX_FILE_SIZE = maxSizeMB * 1024 * 1024;

  // Check if the file size exceeds the maximum limit
  if (imageFile.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: "File size exceeds " + maxSizeMB + "MB",
    };
  } else {
    return {
      success: true,
      message: "File size is within the limit",
    };
  }
}

export const handleItemSelection = async (selectedItems, setItems, newItem) => {
  const itemIndex = selectedItems.findIndex(
    (sItem) => sItem._id === newItem._id
  );
  if (itemIndex !== -1) {
    setItems(selectedItems.filter((sItem) => sItem._id !== newItem._id));
  } else {
    setItems([...selectedItems, newItem]);
  }
};

export const handleItemSelectionByTargetId = async (
  selectedItems,
  setItems,
  newItem
) => {
  const itemIndex = selectedItems.findIndex(
    (sItem) => sItem?.targetId === newItem?.targetId
  );
  if (itemIndex !== -1) {
    setItems(
      selectedItems.filter((sItem) => sItem.targetId !== newItem?.targetId)
    );
  } else {
    setItems([...selectedItems, newItem]);
  }
};

export const mediaCollectionStyles = (length = 1) => {
  return (
    (length === 1 && "grid grid-cols-1 grid-rows-1") ||
    (length >= 2 && length <= 4 && "grid grid-cols-2 grid-rows-2") ||
    (length >= 5 && length <= 6 && "grid grid-cols-3 grid-rows-2") ||
    (length >= 7 && length <= 9 && "grid grid-cols-3 grid-rows-3") ||
    (length >= 10 && length <= 13 && "grid grid-cols-4 grid-rows-3") ||
    (length >= 14 && length <= 16 && "grid grid-cols-4 grid-rows-4") ||
    (length >= 17 && length <= 20 && "grid grid-cols-5 grid-rows-4") ||
    (length >= 21 && "grid grid-cols-6 grid-rows-6") ||
    "grid grid-cols-6 grid-rows-6"
  );
};

export const handleWallpaperUploadWithProgress = async (
  files = [],
  setFiles
) => {
  const storedFiles = [...files];
  const allResults = [];

  const uploadPromises = files.map((element, index) => {
    const formData = new FormData();
    formData.append("file", element);

    const debouncedSetFiles = debounce(() => {
      setFiles([...storedFiles]);
    }, 100);

    return axios
      .post(`${BASE_URL}/wallpapers/upload/single`, formData, {
        headers: {
          Authorization: `Bearer ${nookies.get()[TOKEN_NAME]}`,
        },
        onUploadProgress: (event) => {
          storedFiles[index]["progress"] = Math.round(
            (event.loaded * 100) / event.total
          );
          debouncedSetFiles();
        },
      })
      .then((data) => {
        if (data?.data?.success && data?.data?.data) {
          storedFiles[index]["success"] = true;
          const result = data?.data?.data;
          allResults.push(result);
        } else {
          storedFiles[index]["success"] = false;
        }
        storedFiles[index]["progress"] = 100;
        debouncedSetFiles.cancel();
        setFiles([...storedFiles]);
      })
      .catch((error) => {
        storedFiles[index]["success"] = false;
        storedFiles[index]["progress"] = 100;
        console.error("Upload failed:", error);
      });
  });

  await Promise.all(uploadPromises);
  return { success: true, results: allResults };
};

export const handlePastTags = (e, tags = [], setTags) => {
  e.preventDefault();

  // Split the input string into tags by commas
  const pastedText = e.clipboardData.getData("Text");

  // Split the pasted text by commas, trim extra spaces, and filter out empty entries
  const newTags = pastedText
    .split(",")
    .map((tag) => tag.trim()) // Trim each tag
    .filter((tag) => tag); // Remove empty entries

  setTags([...tags, ...newTags]);
  e.target.value = ""; // Clear the input field
};
