import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  imports: [TranslateModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage = input<number>(1);
  totalPages = input<number>(1);
  maxVisiblePages = input<number>(5);

  @Output() pageChange = new EventEmitter<number>();

  pagesArray = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const max = this.maxVisiblePages();

    let start = Math.max(current - Math.floor(max / 2), 1);
    let end = start + max - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - max + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  goToPage(page: number) {
    if (page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  nextPage() {
    const next = this.currentPage() + 1;
    if (next <= this.totalPages()) {
      this.pageChange.emit(next);
    }
  }

  prevPage() {
    const prev = this.currentPage() - 1;
    if (prev >= 1) {
      this.pageChange.emit(prev);
    }
  }
}
