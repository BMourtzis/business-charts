export type VDataTableRow<T> = {
  item: T;
  index: number;
  page?: number;
  type?: string;
};