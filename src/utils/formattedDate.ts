export const formattedDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${dd}/${mm}/${yyyy}`;
};
