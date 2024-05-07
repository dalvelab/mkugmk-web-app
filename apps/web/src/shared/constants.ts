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
  mon: "monday",
  tue: "tuesday",
  wed: "wednesday",
  thurs: "thursday",
  fri: "friday",
  sat: "saturday",
  sun: "sunday",
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
