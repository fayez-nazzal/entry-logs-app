import dayjs from "dayjs";

export const formatIsoDateTime = (isoDate) => {
  return dayjs(isoDate).format("YYYY-MM-DD HH:mm:ss");
};
