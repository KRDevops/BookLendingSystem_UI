import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { UserService } from 'src/app/login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required],
      authorName: ['', Validators.required],
      category: ['', Validators.required],
      publicationYear: ['', Validators.required],
      isbn: ['', Validators.required],
    });
  }

  onAddBook = () => {
    this.submitted = true;
    this.success = false;
    const obj = this.bookForm.value;
    obj.userId = this.userService.isUserLoggedIn.value.userId;
    this.bookService.add(obj).subscribe(res => {
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/home/history']);
      }, 5000);
    });
  }

}
