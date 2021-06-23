import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealsComponent } from './deals/deals.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:book', component: SearchComponent },
  { path: 'login', component: LoginComponent},
  { path: 'deals', component: DealsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
