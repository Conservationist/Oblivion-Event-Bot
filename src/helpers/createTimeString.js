import date from "date-and-time";

export default function createTimeString(time) {
  const curr_date = new Date().toDateString();
  const time_date = new Date(curr_date + " " + time);
  return date.format(time_date, "MMM DD HH:mm [CET]");
}
