import { Component, OnInit } from '@angular/core';
import { UserService } from './login/user.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean = false;
  currentUrl: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.currentUrl = res.urlAfterRedirects;
      }
    });

    this.userService.watchUser.subscribe(res => {
      this.loggedIn = res;
    });
  }
}
