import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './core/alert/alert.component';
import { HeadingComponent } from './core/heading/heading.component';
import { BannerComponent } from './core/banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { BooksComponent } from './home/books/books.component';
import { BookService } from './home/book.service';
import { HistoryComponent } from './home/history/history.component';
import { AddBookComponent } from './home/add-book/add-book.component';
import { InputComponent } from './core/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    AlertComponent,
    HeadingComponent,
    BannerComponent,
    CategoryComponent,
    BooksComponent,
    HistoryComponent,
    AddBookComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
