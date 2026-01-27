export type VDataTableRow<T> = {
  item: T;
  index: number;
  page?: number;
  type?: string;
};

export type ButtonOptions = {
  title: string;
  color?: string;
  icon?: string;
  action: () => void
}