export default function dateReformat(date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  const year = newDate.getFullYear();
  if (month < 10) {
    month = '0' + month.toString();
  }
  if (day < 10) {
    day = '0' + day.toString();
  }
  return { format1: `${month}-${day}-${year}`, format2: `${year}-${month}-${day}` };
}
