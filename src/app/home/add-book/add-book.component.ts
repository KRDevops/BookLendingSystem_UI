import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  error: boolean = false;
  message: string = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required],
      authorName: ['', Validators.required],
      category: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  /**
   * getter for access form fields easily
   */
  get f() {
    return this.bookForm.controls;
  }

  /**
   * Add an book
   * @var userId number
   */
  onAddBook = () => {
    this.submitted = true;
    this.success = false;
    this.error = false;
    if (!this.bookForm.valid) {
      return;
    }

    const obj = this.bookForm.value;
    obj.userId = this.userService.isUserLoggedIn.value.userId;
    this.bookService.add(obj).subscribe(res => {
      this.success = true;
      this.bookForm.reset();
    }, err => {
      this.error = true;
      this.message = err.error.message;
    });
  }

}
