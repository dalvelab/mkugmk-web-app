import type { WeekDay } from "./models";

export const CANONICAL_DOMAIN = "https://mkugmk.ru";

export const rusFullDayNamesMap: Record<WeekDay, string> = {
  mon: "понедельник",
  tue: "вторник",
  wed: "среда",
  thurs: "четверг",
  fri: "пятница",
  sat: "суббота",
  sun: "воскресенье",
};

export const engFullDayNamesMap: Record<WeekDay, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thurs: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export const genetiveRusMonths = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
