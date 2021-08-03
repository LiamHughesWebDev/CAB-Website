import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BookService } from './books.service';
import { LoginService } from './login/login.service'
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SmallResultComponent } from './shared/small-result/small-result.component';
import { AdvertismentComponent } from './shared/advertisment/advertisment.component';
import { FeaturedResultComponent } from './shared/featured-result/featured-result.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MyBooksComponent } from './my-books/my-books.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    SmallResultComponent,
    AdvertismentComponent,
    FeaturedResultComponent,
    LoadingSpinnerComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BookService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
