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

  constructor(private BookService: BookService, private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    console.log(this.afAuth.user);
  }

  onSearch(f) {
    var searchTerm: string = f.value.search;

    this.router.navigate(['search', searchTerm]).then(()=>{
      window.location.reload();
    });

  }

  

  ngOnDestroy(){

  }
 
  StickyNavbar(){
    
    var prevScrollpos = window.pageYOffset;

    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("searchBar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-50px";
        document.getElementById("searchBar").style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
}
  }

}
