const dateFormat = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export default dateFormat;

export const timeFormat = (time: string) => {
  return new Date(time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
