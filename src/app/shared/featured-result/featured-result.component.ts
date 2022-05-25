import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';





@Component({
  selector: 'app-featured-result',
  templateUrl: './featured-result.component.html',
  styleUrls: ['./featured-result.component.scss']
})
export class FeaturedResultComponent implements OnInit {
  @Input() FeaturedBook;
  @ViewChild('section') public Section: ElementRef;
  
  book = [];
  

  constructor() { }

  ngOnInit(): void {
    console.log(this.FeaturedBook[0].items[0]);

    if(this.FeaturedBook.length != 0){
      console.log("more than 1");
      
      
    }
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
