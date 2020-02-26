import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../Service/books.service';
import {Book} from '../../Interfaces/book';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'remove'];
  data: Book[];

  constructor(private bookService: BooksService) {
    bookService.favouriteSubj.subscribe(favourites =>
    {
      if (favourites)
        this.data = favourites.map(jsonBook => JSON.parse(jsonBook));

    });

  }

  ngOnInit(): void {

  }

  remove(row: number) {

    console.log(row);
    this.data.splice(row, 1);
    this.bookService.favouriteSubj.next(this.data.map(jsonBook => JSON.stringify(jsonBook)));
  }
}
