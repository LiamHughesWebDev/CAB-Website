import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedBook= "";
  Results = [];
  Books = []
  

  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.searchedBook = this.route.snapshot.params['book'];
    var books = this.bookService.getBook(this.searchedBook);
    setTimeout( () => {
      this.Results.push(books);
      console.log(this.Results);
      this.Books = this.Results[0][0].items;
      console.log(this.Books);
    }, 1000)
  }
}
