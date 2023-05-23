import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { book } from '../../books.service'

@Component({
  selector: 'app-small-result',
  templateUrl: './small-result.component.html',
  styleUrls: ['./small-result.component.scss']
})
export class SmallResultComponent implements OnInit {
  @Input() RecommendedBook;
  @Input() Searched;
  @ViewChild('wrapper') public Section: ElementRef;

  constructor() { }

  book:book[]= [];
  isLoading = true;
  showAuthor = true;

  ngOnInit(): void {

    console.log(this.RecommendedBook);
    setTimeout(() => {
      this.book.push(this.RecommendedBook[0].items[0]); 
      console.log(this.book)
      this.isLoading = false;

      if(!this.book[0].volumeInfo.authors){
        console.log(this.book);
        this.book[0].volumeInfo.authors = ["No Author found"]; 
     }
    }, 50);



    console.log(this.RecommendedBook);
  }


  mouseEnter(){
    this.Section.nativeElement.classList.add('hover');
  
   
  }
  mouseLeave(){
    this.Section.nativeElement.classList.remove('hover');
  }
  
  
  showDesc(){
    this.Section.nativeElement.classList.add('hover');
  }
  
   hideDesc(){ 
      this.Section.nativeElement.classList.remove('hover');
   }
    
  
}
