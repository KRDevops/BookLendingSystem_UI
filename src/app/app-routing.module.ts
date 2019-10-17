import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { HistoryComponent } from './home/history/history.component';
import { BooksComponent } from './home/books/books.component';
import { AddBookComponent } from './home/add-book/add-book.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'books', pathMatch: 'full'
      },
      {
        path: 'books', component: BooksComponent
      },
      {
        path: 'add-book', component: AddBookComponent
      },
      {
        path: 'history', component: HistoryComponent
      }
    ],
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
