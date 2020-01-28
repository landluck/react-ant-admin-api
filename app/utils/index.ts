export function isEmptyObj(value: any): boolean {
  return typeof value === 'object' && Object.keys(value).length === 0;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function toNumber(value: any, defaultValue?: number): number {
  if (!value) {
    if (defaultValue) return defaultValue;
  }
  if (isNumber(value)) return value as number;
  const num = Number(value);
  if (isNumber(num)) return num;
  return 0;
}
