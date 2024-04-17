import type { StrapiWorkingTime } from "../models";

import { rusFullDayNamesMap, engFullDayNamesMap, genetiveRusMonths } from '../constants';
import { isEmpty, isNotEmpty, isVoid } from "./misc";

export function createWorkingSchedule(data: StrapiWorkingTime[], locale: string | undefined = 'ru') {
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
        day: '',
        value: '',
        opened: false,
      }
    ]
  }

  const openedCenters = data.filter((center) => center.opened);
  
  const dayNames = locale === 'ru' ? rusFullDayNamesMap : engFullDayNamesMap;
  const weekday = locale === 'ru' ? 'выходной' : 'closed';
  const closed = locale === 'ru' ? 'временно закрыто' : 'temporarily closed';

  if (isEmpty(openedCenters)) {
    return [
      {
        id: 0,
        day: `${dayNames[data[0].day]}-${dayNames[data[data.length - 1].day]}`,
        value: closed,
        opened: false,
      }
    ]
  }

  for (let i = 0; i < data.length; i++) {
    const day = {
      id: i,
      day: dayNames[data[i].day],
      value: data[i].opened ? data[i].value : weekday,
      opened: data[i].opened,
    }

    if (
        isNotEmpty(formatted) && 
        formatted[formatted.length - 1].value.toLowerCase() === data[i].value.toLowerCase() &&
        formatted[formatted.length - 1].opened === data[i].opened
      ) {
      const prevDayName = formatted[formatted.length - 1].day;
      const concatinatedName = prevDayName.includes('-') ? prevDayName.split('-')[0] : prevDayName;

      formatted[formatted.length - 1] = {
          ...formatted[formatted.length - 1],
          day: `${concatinatedName}-${dayNames[data[i].day]}`,
          value: data[i].value.toLowerCase(),
          opened: data[i].opened,
        }
    } else {
      formatted.push(day);
    }
  }

  return formatted;
}

export function getWorkingHoursForToday(data: StrapiWorkingTime[], dayOfWeek: number, locale: string | 'undefined' = 'ru'): StrapiWorkingTime {
  const closedText = locale === 'ru' ? 'Сегодня закрыто' : 'Today the museum is closed';
  const openedText = locale === 'ru' ? 'Сегодня открыто с' : 'Today is opened from';
  const untillText = locale === 'ru' ? 'до' : 'untill';

  const index = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const today = data[index];

  if (isVoid(today)) {
    return {
      id: 0,
      opened: false,
      day: 'mon',
      value: locale === 'ru' ? 'некорректное заполнение' : 'incorrect data',
    }
  }

  return {
    ...today,
    value: today.opened 
      ? `${openedText} ${today.value.split('-')[0]} ${untillText} ${today.value.split('-')[1]}`
      : closedText
  }
}

export function getformatDateLocale(date: Date, timeZone: string = 'Asia/Yekaterinburg' ) {
  return new Date(date).toLocaleString('ru-RU', { timeZone }).split(',')[0];
}

export function getformatDateLocaleTime(date: Date, timeZone: string = 'Asia/Yekaterinburg' ) {
  return new Date(date).toLocaleString('ru-RU', { timeZone }).split(',')[1].trim().substring(0, 5)
}

export function getGenetiveRusMonth(month: number) {
  return genetiveRusMonths[month - 1];
}