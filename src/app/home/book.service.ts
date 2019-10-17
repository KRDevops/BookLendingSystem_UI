import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import { environment } from 'src/environments/environment.prod';
import { Order } from './history/order';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Add a book
   */
  add = (book: Book) => {
    return this.http.post<Book>(`${environment.apiDomain}/add`, book);
  }

  /**
   * Get all transaction
   */
  history = (userId: User) => {
    return this.http.get<Order[]>(`${environment.apiDomain}/users/${userId}/books`);
  }

  /**
   * Search the book based on keywords
   */
  search = (bookName: string = null, authorName: string = null, pageNumber: number = 0) => {
    return this.http.get<Book[]>(`${environment.apiDomain}/books?bookName=${bookName}&authorName=${authorName}&pageNumber=${pageNumber}`);
  }

  /**
   * Request for borrow & request
   */
  request = (obj: { bookId: number, userId: number, transactionType: string }) => {
    return this.http.post(`${environment.apiDomain}/requests`, obj);
  }
}
