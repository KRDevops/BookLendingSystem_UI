import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../login/user';
import { UserService } from '../login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  submitted: boolean = false;
  message: string = '';
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
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['']
    });
  }

  onRegister() {
    this.userService.create(this.registerForm.value).subscribe(res => {
      this.submitted = true;
      const r: any = res;
      this.message = r.message;
      // this.registerForm.clear()
      this.router.navigate(['/login']);
    });
  }

}
