export interface Pagination {
  pageSize: number;
  length: number;
  pageIndex: number;
  pageSizeOptions: Array<number>;
  page: number;
  previousPage?: number;
  disabled: boolean;
}
