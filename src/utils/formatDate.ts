// formatting date format from  to dd.mm.yyyy, hh:mm:ss
export const formatDate = (rawDate: string) => {
  const isoDateStr = rawDate.replace(/([+-])(\d{2})(\d{2})$/, "$1$2:$3");

  const date = new Date(isoDateStr);

  return date.toLocaleString("ru-RU")
};