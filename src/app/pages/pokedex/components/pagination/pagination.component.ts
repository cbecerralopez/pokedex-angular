import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  // currentPage: number = 1;
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor() {
  }

  ngOnInit() {
    this.calculatePages();
  }

  ngOnChanges() {
    this.calculatePages();
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updateVisiblePages();
  }

  updateVisiblePages() {
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(this.totalPages, start + 2);
    this.visiblePages = Array.from(
      {length: end - start + 1},
      (_, i) => i + start
    );
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  selectPage(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage(): void {
    if (!this.isFirstPage()) {
      this.currentPage--;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (!this.isLastPage()) {
      this.currentPage++;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage);
    }
  }
}
