export const formatDate = (date: any) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  // const hours = d.getHours() % 12 || 12;
  // const minutes = d.getMinutes();
  // const ampm = d.getHours() < 11 ? "AM" : "PM";

  const addPadding = (x: number) => x.toString().padStart(2, '0');

  return `${addPadding(day)}/${addPadding(month)}/${year} `;
  // ${addPadding(
  //     hours
  // )}:${addPadding(minutes)} ${ampm}`;
};
