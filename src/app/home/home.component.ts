import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  FeaturedBookNames = ["Magic Tree House",  "Wayside school is falling down"];
  FeaturedBook = [];

  RecommendedBookNames = ["Stories for 3 Year Olds", "Harry Potter", "The Little Prince", "Island of the Blue Dolphins", "A Series of Unfortunate Events", "Ella Enchanted", "The Boxcar Children", "Chasing Redbird and Ruby Holler"];
  RecommendedBook = [];
  

  constructor(private BookService: BookService) {}
  
  isLoading = false;

  ngOnInit(): void {

    this.getBooks();

    

  }
  

  getBooks(){
    
 
    this.isLoading = true;
    console.log(this.isLoading);

    this.FeaturedBookNames.forEach(element => {

       
      var book = this.BookService.getBook(element);
      setTimeout(() => {
        this.FeaturedBook.push(book);
      }, 1000);
      console.log("added");
    });

    this.RecommendedBookNames.forEach(element => {
      var book = this.BookService.getBook(element);
      setTimeout(() => {
        this.RecommendedBook.push(book);
      }, 1000);
 
      
   
    });
    
    setTimeout( ()=> {this.isLoading = false; console.log(this.isLoading);}, 1000);


    console.log(this.FeaturedBook);
  }

 

















  
  // featuredBooks = [
  //   { name: "Good Omens", Price: "30.79", Author: "Terry Pratchett", bookCover: "./assets/images/bookCovers/GoodOmens.jpg" },
  //   { name: "Nothing to See Here", Price: "23.95", Author: "Kevin Wilson", bookCover: "./assets/images/bookCovers/NothingtoSeeHere.jpg" },
  //   { name: "The Substitution Order", Price: "31.49", Author: "Martin Clark", bookCover: "./assets/images/bookCovers/theSubstitutionOrder.jpg" },
  //   { name: "Twisted Twenty-Six", Price: "22.40", Author: "Janet Evanovich", bookCover: "./assets/images/bookCovers/TwistedTwentySix.jpg" }
  // ];
  // otherBooks = [
  //   { name: "Good Omens", Price: "30.79", Author: "Terry Pratchett", bookCover: "./assets/images/bookCovers/GoodOmens.jpg" },
  //   { name: "Nothing to See Here", Price: "23.95", Author: "Kevin Wilson", bookCover: "./assets/images/bookCovers/NothingtoSeeHere.jpg" },
  //   { name: "The Substitution Order", Price: "31.49", Author: "Martin Clark", bookCover: "./assets/images/bookCovers/theSubstitutionOrder.jpg" },
  //   { name: "Twisted Twenty-Six", Price: "22.40", Author: "Janet Evanovich", bookCover: "./assets/images/bookCovers/TwistedTwentySix.jpg" },
  //   { name: "Good Omens", Price: "30.79", Author: "Terry Pratchett", bookCover: "./assets/images/bookCovers/GoodOmens.jpg" },
  //   { name: "Nothing to See Here", Price: "23.95", Author: "Kevin Wilson", bookCover: "./assets/images/bookCovers/NothingtoSeeHere.jpg" },
  //   { name: "The Substitution Order", Price: "31.49", Author: "Martin Clark", bookCover: "./assets/images/bookCovers/theSubstitutionOrder.jpg" },
  //   { name: "Twisted Twenty-Six", Price: "22.40", Author: "Janet Evanovich", bookCover: "./assets/images/bookCovers/TwistedTwentySix.jpg" }
  // ];

  // ranNum1 = Math.floor(Math.random() * 2);

  // ranNum2 = Math.floor(Math.random() * (5 - 3)) + 2;
}
