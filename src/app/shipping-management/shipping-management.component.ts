import { Component, OnInit } from '@angular/core';
export interface state {
  value: string;
  viewValue: string;
}
export interface city {
  value: string;
  viewValue: string;
}
export interface status {
  value: string;
  viewValue: string;
}
@Component({ 
  selector: 'app-shipping-management',
  templateUrl: './shipping-management.component.html',
  styleUrls: ['./shipping-management.component.scss']
})
export class ShippingManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
states: state[] = [
    {value: 'bang', viewValue: 'Bangalore'},
    {value: 'chennai', viewValue: 'Chennai'},
    {value: 'Tel', viewValue: 'Telangana'}
  ];
   cities: city[] = [
    {value: 'Bang', viewValue: 'Bangalore'},
    {value: 'Chen', viewValue: 'Chennai'},
    {value: 'Hyd', viewValue: 'Hyderabad'}
  ];
  statuss: status[] = [
    {value: 'active', viewValue: 'Active'},
    {value: 'inactive', viewValue: 'In Active'}
  ];
}
