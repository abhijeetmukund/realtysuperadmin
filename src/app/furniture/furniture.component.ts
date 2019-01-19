import { Component, OnInit } from '@angular/core';
export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 statuss: Status[] = [
    {value: 'active', viewValue: 'Active'},
    {value: 'inactive', viewValue: 'In Active'}
 ];
}
