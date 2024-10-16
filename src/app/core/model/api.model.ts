export default interface api<T> {
  data: T[];
  page: number;
  perPage: number;
  total: number;
}
