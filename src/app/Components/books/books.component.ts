import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../Service/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
  }

  applyFilter() {
    this.bookService.getData('hello');
  }
}
