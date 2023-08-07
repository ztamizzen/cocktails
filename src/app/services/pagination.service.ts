import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private pageCount: number = 0;
  private pageSize: number = 10;
  private pageIndex: number = 0;
  private disabled: boolean = false;
  private static pageSizeOptions: Array<number> = [5, 10, 25, 100];
  private previousPage: number = 0;

  constructor() {}
  reset(pageCount = 10) {
    this.pageCount = pageCount;
    return {
      pageSize: this.pageSize,
      length: this.pageCount,
      page: 0,
      pageIndex: 0,
      pageSizeOptions: PaginationService.pageSizeOptions,
      disabled: false,
      previousPage: 0,
    };
  }

  isDisabled(pageCount: number) {
    this.pageCount = pageCount;
    return this.pageCount <= 10;
  }
}
