import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { book } from '../../books.service'





@Component({
  selector: 'app-featured-result',
  templateUrl: './featured-result.component.html',
  styleUrls: ['./featured-result.component.scss']
})
export class FeaturedResultComponent implements OnInit {
  @Input() FeaturedBook;
  @Input() Searched;
  @ViewChild('wrapper') public Section: ElementRef;
  
  book:book[]= [];
  isLoading = true;
  
  showAuthor = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.FeaturedBook);
    console.log(this.Searched);

    setTimeout(() => {
      
      if(this.Searched === false){
        this.book.push(this.FeaturedBook[0].items[0]); 
        console.log(this.book)
      }
      if(this.Searched === true){
          this.book.push(this.FeaturedBook); 
          console.log(this.book)
      }

      if(!this.book[0].volumeInfo.authors){
        console.log(this.book);
        this.book[0].volumeInfo.authors = ["No Author found"]; 
     
     }
      this.isLoading = false;
    }, 1000);

 

  

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
