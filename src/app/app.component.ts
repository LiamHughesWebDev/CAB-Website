import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navigation = [
    { name: "Home", color: "#205fbd" },
    { name: "Genres", color: "#164283" },
    { name: "Deals", color: "#ac1a37" },
    { name: "Login", color: "#d03a67" }
  ];

  constructor(private BookService: BookService, private router: Router) { }



  ngOnInit(): void {


  }

  onSearch(f) {
    var searchTerm: string = f.value.search;

    this.router.navigate(['search', searchTerm]).then(()=>{
      window.location.reload();
    });

  }


 

}
