import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;
  submitted: boolean = false;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    /**
     * Redirection if user logged in
     */
    if (this.userService.isUserLoggedIn.value) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Login with crediantials
   * @var emailId string
   * @var password string
   */
  onLogin = () => {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.subscription = this.userService.login(this.loginForm.value).subscribe(res => {
        let r: any = res;
        this.userService.setUser = { userId: r.userId };
        this.userService.isUserLoggedIn.next(this.userService.getUser);
        this.router.navigate(['/home']);
      });
    }
  }

  /**
   * destroy subcription of login/logout watcher
   */
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
