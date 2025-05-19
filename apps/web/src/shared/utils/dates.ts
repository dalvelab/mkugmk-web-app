import type { StrapiSpecialDay, StrapiWorkingTime } from "../models";

import {
  rusFullDayNamesMap,
  engFullDayNamesMap,
  genetiveRusMonths,
} from "../constants";
import { isEmpty, isNotEmpty, isNotVoid, isVoid } from "./misc";
import { ExhibitionCenter } from "@/entities";

export function createWorkingSchedule(
  data: StrapiWorkingTime[],
  locale: string | undefined = "ru"
) {
  const formatted: Array<{
    id: number;
    day: string;
    value: string;
    opened: boolean;
  }> = [];

  if (isEmpty(data)) {
    return [
      {
        id: 0,
        day: "",
        value: "",
        opened: false,
      },
    ];
  }

  const openedCenters = data.filter((center) => center.opened);

  const dayNames = locale === "ru" ? rusFullDayNamesMap : engFullDayNamesMap;
  const weekday = locale === "ru" ? "выходной" : "closed";
  const closed = locale === "ru" ? "временно закрыто" : "temporarily closed";

  if (isEmpty(openedCenters)) {
    return [
      {
        id: 0,
        day: `${dayNames[data[0].day]}-${dayNames[data[data.length - 1].day]}`,
        value: closed,
        opened: false,
      },
    ];
  }

  for (let i = 0; i < data.length; i++) {
    const day = {
      id: i,
      day: dayNames[data[i].day],
      value: data[i].opened ? data[i].value : weekday,
      opened: data[i].opened,
    };

    if (
      isNotEmpty(formatted) &&
      formatted[formatted.length - 1].value.toLowerCase() ===
        data[i].value.toLowerCase() &&
      formatted[formatted.length - 1].opened === data[i].opened
    ) {
      const prevDayName = formatted[formatted.length - 1].day;
      const concatinatedName = prevDayName.includes("-")
        ? prevDayName.split("-")[0]
        : prevDayName;

      formatted[formatted.length - 1] = {
        ...formatted[formatted.length - 1],
        day: `${concatinatedName}-${dayNames[data[i].day]}`,
        value: data[i].value.toLowerCase(),
        opened: data[i].opened,
      };
    } else {
      formatted.push(day);
    }
  }

  return formatted;
}

export function getWorkingHoursForToday({
  data,
  dayOfWeek,
  locale = "ru",
  isSpecialDayToday,
}: {
  data: StrapiWorkingTime[];
  dayOfWeek: number;
  locale: string | undefined;
  isSpecialDayToday?: boolean;
}): StrapiWorkingTime {
  const closedText =
    locale === "ru" ? "Сегодня закрыто" : "Today the museum is closed";
  const openedText =
    locale === "ru" ? "Сегодня открыто с" : "Today is opened from";
  const untillText = locale === "ru" ? "до" : "untill";

  // CHECK IF TODAY'S DATE INCLUDED INTO SPECIAL DAYS
  if (isNotVoid(isSpecialDayToday) && !isSpecialDayToday) {
    return {
      id: 0,
      opened: false,
      day: "mon",
      value: closedText,
    };
  }

  const index = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const today = data[index];

  if (isVoid(today)) {
    return {
      id: 0,
      opened: false,
      day: "mon",
      value: locale === "ru" ? "некорректное заполнение" : "incorrect data",
    };
  }

  return {
    ...today,
    value: today.opened
      ? `${openedText} ${today.value.split("-")[0]} ${untillText} ${
          today.value.split("-")[1]
        }`
      : closedText,
  };
}

export function checkComplexOperatingHours(days: StrapiSpecialDay[]) {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

  let isAvailable = true;
  let day: StrapiSpecialDay | undefined;

  for (let i = 0; i < days.length; i++) {
    if (formattedDate === days[i].day) {
      if (!days[i].opened) {
        isAvailable = false;
      }
      day = days[i];
      break;
    }
  }

  return { isAvailable, day };
}

export function getformatDateLocale(
  date: Date,
  timeZone: string = "Asia/Yekaterinburg"
) {
  return new Date(date).toLocaleString("ru-RU", { timeZone }).split(",")[0];
}

export function getformatDateLocaleTime(
  date: Date,
  timeZone: string = "Asia/Yekaterinburg"
) {
  return new Date(date)
    .toLocaleString("ru-RU", { timeZone })
    .split(",")[1]
    .trim()
    .substring(0, 5);
}

export function getGenetiveRusMonth(month: number) {
  return genetiveRusMonths[month - 1];
}

export function getEqualScheduleForExhibitionCenters(
  data: ExhibitionCenter[] | null,
  locale: string
) {
  if (!data) {
    return [];
  }

  const uniqueData = [];
  const hashes = new Set();

  for (let i = 0; i < data.length; i++) {
    const hash = data[i].working_time
      .map((day) => day.value.trim().toLowerCase())
      .reduce((acc, cur) => {
        return acc + cur;
      }, "");

    if (hashes.has(hash)) {
      const indexOfHash = Array.from(hashes).indexOf(hash);
      uniqueData[indexOfHash].name =
        locale === "ru" ? "Выставочные центры" : "Exhibition centers";
      continue;
    } else {
      hashes.add(hash);
      uniqueData.push(data[i]);
    }
  }

  return uniqueData;
}

export function selectScheduleForExhibitionCenter(
  regularWorkingTime: StrapiWorkingTime[],
  selectedExhibitionCenterId: string,
  specialWorkingTime?: StrapiWorkingTime[],
  exhibitionCenterIds?: string[]
) {
  if (
    isNotVoid(specialWorkingTime) &&
    isNotEmpty(specialWorkingTime) &&
    isVoid(exhibitionCenterIds)
  ) {
    return specialWorkingTime;
  }

  if (
    isNotVoid(specialWorkingTime) &&
    isNotEmpty(specialWorkingTime) &&
    isNotVoid(exhibitionCenterIds) &&
    isNotEmpty(exhibitionCenterIds) &&
    exhibitionCenterIds.includes(selectedExhibitionCenterId)
  ) {
    return specialWorkingTime;
  }

  return regularWorkingTime;
}
