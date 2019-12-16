export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}
