export interface PageMeta {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
  }

export type Page<T> = {
  items: Array<T>;
  meta: PageMeta;
}