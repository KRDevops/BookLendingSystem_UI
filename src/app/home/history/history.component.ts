import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { UserService } from 'src/app/login/user.service';
import { User } from 'src/app/login/user';
import { Order } from './order';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  user: User;
  userId;
  orders: Order[] = [];
  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.userService.isUserLoggedIn.value.userId;
    this.bookService.history(this.userId).subscribe(res => {
      this.orders = res;
    });
  }

}
