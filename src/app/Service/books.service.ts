import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Book } from '../Interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {
  }

  getData(name: string, startIndex = 0, maxResults = 20) {
    this.http.get(this.apiURL + name).pipe(
      map((data: any) => data.items.map(item => {
        return {
          id: item.id,
          title: item.volumeInfo.title
        };
      }) )
    ).subscribe((data: Book) => console.log(data), error => console.error(error));

  }
}
