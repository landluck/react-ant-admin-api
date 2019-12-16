export function createRandomStr (): string {
  return Math.random().toString().substr(2);
}

export function createRandomNum(max: number, min: number | undefined = 0): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}