import dayjs from "dayjs";

export const formatedDate = (dateString) => dayjs(dateString).format("DD-MM-YYYY");
export const viewFile = (fileName) => {
    window.open(`${import.meta.env.VITE_VIEW_FILE_URL}/${fileName}`, "_blank");
}

export const formatLabel = (str) => {
  if (!str) return "";
  return str
    .split("_")                 // split by underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
    .join(" ");                 // join with space
};
