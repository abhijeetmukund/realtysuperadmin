import { Component, OnInit } from '@angular/core';
export interface Country {
  value: string;
  viewValue: string;
}
export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  countrys: Country[] = [
   {value: 'ind-1', viewValue: 'India'},
   {value: 'thai-2', viewValue: 'Thailand'},
   {value: 'sing-3', viewValue: 'Singapore'}
 ];
  statuss: Status[] = [
   {value: 'active', viewValue: 'Active'},
   {value: 'inactive', viewValue: 'In Active'},
 ];
}
