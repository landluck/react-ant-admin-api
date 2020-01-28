
export function formatNumber(value: number): string {
  const str: string = value.toString();

  return str[1] ? str : `0${str}`;
}

export function formatTimeByFormater(value: Date, formater: string): string {
  const info: {
    [propName: string]: any,
  } = {
    YYYY: value.getFullYear(),
    MM: value.getMonth() + 1,
    DD: value.getDate(),
    HH: value.getHours(),
    mm: value.getMinutes(),
    SS: value.getSeconds(),
  };

  Object.keys(info).forEach(key => {
    formater = formater.replace(key, formatNumber(info[key]));
  });

  return formater;
}

export function now(): number {
  return new Date().getTime();
}

export const ONE_DAY_TIME = 86400000;
