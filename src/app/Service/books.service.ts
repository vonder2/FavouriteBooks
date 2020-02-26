import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Book } from '../Interfaces/book';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';
  private filterState: string;
  private vaginatorState: string;
  dataSubj = new BehaviorSubject<Book[]>(null);
  favouriteSubj = new BehaviorSubject<string[]>(null);

  constructor(private http: HttpClient) {  }

  get filterText(): string {
    return this.filterState;
  }

  set filterText(value: string) {
    this.filterState = value;
  }

  getData(name: string, startIndex = 0, maxResults = 20) {
    const requestURl = this.apiURL + name + '&startIndex=' + startIndex + '&maxResults=' + maxResults;

    this.http.get(requestURl).pipe(
      map((data: any) => data.items.map(item => {
        return {
          id: item.id,
          title: item.volumeInfo.title
        };
      }) )
    ).subscribe((data: Book[]) => this.dataSubj.next(data), error => console.error(error));

  }
}
