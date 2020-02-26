import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BooksService} from '../../Service/books.service';
import {Book} from '../../Interfaces/book';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'title', 'select'];
  data: Book[] = [];
  isLoadingResults = false;
  resultsLength = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40];
  filter: string;
  selection: SelectionModel<string>;

  // pageEvent: PageEvent;

  constructor(private bookService: BooksService) {
    bookService.dataSubj.subscribe(data => {
      this.data = data;
      this.isLoadingResults = false;
    });

    bookService.favouriteSubj.subscribe(favourites =>
      this.selection = new SelectionModel<string>(true, favourites));

    this.filter = bookService.filterText;
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.applyPaginator());
    this.selection.changed.subscribe(selected =>
      console.log('added:', selected.added, 'removed:', selected.removed, 'overral', this.selection.selected));

    // TODO save paginator state, get resultsLength from http
  }

  applyFilter() {
    this.bookService.filterText = this.filter;
    this.paginator.firstPage();
    this.isLoadingResults = true;
    this.bookService.getData(this.filter, 0, this.paginator.pageSize);
  }

  applyPaginator() {
    const startIndex = this.paginator.pageSize * this.paginator.pageIndex;
    this.isLoadingResults = true;
    // this.bookService.filterText = this.filter;
    this.bookService.getData(this.filter, startIndex, this.paginator.pageSize);
  }


  like(event, row) {
    event.stopPropagation();
    this.selection.toggle(JSON.stringify(row));
    this.bookService.favouriteSubj.next(this.selection.selected);
    // this.bookService.favouriteSubj.next(this.selection.selected.map(jsonBook => JSON.parse(jsonBook)));
  }

  isLike(row) {
    return this.selection.isSelected(JSON.stringify(row)) ? 'red' : null;
  }
}
