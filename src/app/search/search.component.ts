import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('section') public Section: ElementRef;
  searchedBook= "";
  FeaturedBook = [];
  books = {};
  isLoading = true;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getBook();
  }

  getBook(){
    this.searchedBook = this.route.snapshot.params['book'];
    
    this.bookService.getBook(this.searchedBook).then((res)=>{
      this.FeaturedBook.push(res);

      setTimeout(() => {
        
        this.FeaturedBook = this.FeaturedBook[0][0].items;
        console.log(this.FeaturedBook);
        
      }, 1000);
  

      
    }, (err)=>{
      console.log("error");
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    
  }

    
}
