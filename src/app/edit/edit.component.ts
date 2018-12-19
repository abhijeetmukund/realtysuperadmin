import { Component, OnInit } from '@angular/core';
export interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  cities: City[] = [
   {value: 'ban-1', viewValue: 'Bangalore'},
   {value: 'chen-2', viewValue: 'Chennai'},
   {value: 'hyd-3', viewValue: 'hyderabad'}
  ];
  constructor() { }

  ngOnInit() {
  }
 
}
 