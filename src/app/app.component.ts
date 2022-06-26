import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './books.service';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private BookService: BookService, private router: Router, private loginService: LoginService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.userSub = this.loginService.user.subscribe(user => {
      this.isAuthenticated = !!user; //if user exists, this returns true
      
      // console.log(!user);
      // console.log(!!user);
    });

    this.loginService.autoLogin();
  }

  onSearch(f) {
    var searchTerm: string = f.value.search;

    this.router.navigate(['search', searchTerm]).then(()=>{
      window.location.reload();
    });

  }

  onLogout(){
    this.loginService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
 

}
