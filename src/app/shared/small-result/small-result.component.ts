import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-result',
  templateUrl: './small-result.component.html',
  styleUrls: ['./small-result.component.scss']
})
export class SmallResultComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  @Input() RecommendedBook;
}
