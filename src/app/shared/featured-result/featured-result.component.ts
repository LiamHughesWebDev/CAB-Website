import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-result',
  templateUrl: './featured-result.component.html',
  styleUrls: ['./featured-result.component.scss']
})
export class FeaturedResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() FeaturedBook;

}
