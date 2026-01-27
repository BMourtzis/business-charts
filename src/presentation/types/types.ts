export type VDataTableRow<T> = {
  item: T;
  index: number;
  page?: number;
  type?: string;
};

export type ActionDescriptor<TInput = void> = {
  id?: string;
  title: string;
  color?: string;
  icon?: string;
  execute: (input?: TInput) => void
}