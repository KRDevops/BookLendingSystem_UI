import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Book } from '../book';
import { UserService } from 'src/app/login/user.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  searchForm: FormGroup;
  search: string = null;
  books: Book[] = [];
  bookImages: any = [
    'assets/images/books/image1.jpg',
    'assets/images/books/image2.jpg',
    'assets/images/books/image3.jpg',
    'assets/images/books/image4.jpg'
  ];
  pagination: Array<any> = [];
  paginationActive: number = 0;
  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      bookName: [''],
      authorName: ['']
    });
  }

  onSearch = () => {
    if ((this.searchForm.get('bookName').value).length >= 3 || (this.searchForm.get('authorName').value).length >= 3) {
      this.bookService.search(this.searchForm.get('bookName').value, this.searchForm.get('authorName').value, 0).subscribe(res => {
        let r: any = res;
        this.books = r.data;
        this.pagination = this.generatePagination(r.count, 5);
      });
    }
  }

  onBook = (bookId: number) => {
    this.bookService.request({
      userId: this.userService.isUserLoggedIn.value.userId,
      bookId: bookId,
      transactionType: 'Borrow'
    }).subscribe(res => {
      alert('Booked Successfully');
    });
  }

  onRequest = (bookId: number) => {
    this.bookService.request({
      userId: this.userService.isUserLoggedIn.value.userId,
      bookId: bookId,
      transactionType: 'Request'
    }).subscribe(res => {
      alert('Requested Successfully');
    });
  }

  generatePagination = (count: number, perPage: number) => {
    if ((count / perPage)) {
      return Array(Math.ceil(count / perPage)).fill(0).map((x, i) => ({ id: i + 1 }));
    }
    return [];
  }

  onPagination = (pageId: number) => {
    this.bookService.search(this.searchForm.get('bookName').value, this.searchForm.get('authorName').value, pageId).subscribe(res => {
      let r: any = res;
      this.books = r.data;
      this.paginationActive = pageId;
    });
  }

}
