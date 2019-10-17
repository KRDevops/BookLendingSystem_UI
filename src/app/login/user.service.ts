import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn = new BehaviorSubject<any>(this.getUser);

  constructor(
    private http: HttpClient
  ) { }

  get watchUser() {
    return this.isUserLoggedIn.asObservable();
  }

  set setUser(data) {
    localStorage.setItem('login', JSON.stringify(data));
  }

  get getUser() {
    return JSON.parse(localStorage.getItem('login'));
  }

  create = (user: User) => {
    return this.http.post(`${environment.apiDomain}/registration`, user);
  }

  login = (user: User) => {
    return this.http.post(`${environment.apiDomain}/login`, user);
  }

  logOut = () => {
    localStorage.removeItem('login');
    this.isUserLoggedIn.next(null);
  }
}
