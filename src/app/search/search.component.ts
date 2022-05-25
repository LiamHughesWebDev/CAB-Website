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
  Books = []
  isLoading = false;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.searchedBook = this.route.snapshot.params['book'];
    var getBooks = this.bookService.getBook(this.searchedBook);
    setTimeout( () => {
      this.FeaturedBook.push(getBooks);
      console.log(this.FeaturedBook);

    }, 1000)
  }


    
}
