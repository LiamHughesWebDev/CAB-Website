import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: 'search/:book', component: SearchComponent },
  { path: 'mybooks', component: MyBooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
