import { Component, OnInit } from '@angular/core';
export interface Category {
  value: string;
  viewValue: string;
}
export interface Subcategory {
  value: string;
  viewValue: string;
}
export interface Status { 
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	categories: Category[] = [
	  {value: 'Furniture', viewValue: 'Furniture'},
	  {value: 'Appliances', viewValue: 'Appliances'},
	  {value: 'Combos', viewValue: 'Combos'},
	  {value: 'Mobile', viewValue: 'Mobile'}
	  ];
	  subcategories: Subcategory[] = [
	    {value: 'Beds', viewValue: 'Beds'},
	    {value: 'Sofas', viewValue: 'Sofas'},
	    {value: 'Study', viewValue: 'Study'},
	    {value: 'Mattresses', viewValue: 'Mattresses'},
	    {value: 'Tables', viewValue: 'Tables'},
	    {value: 'Dining', viewValue: 'Dining'},
	    {value: 'Chairs', viewValue: 'Chairs'},
	    {value: 'Store Utility', viewValue: 'Store Utility'}
	  ];
	  statuss: Status[] = [
	    {value: 'Active', viewValue: 'Active'},
	    {value: 'In Active', viewValue: 'In Active'}
	  ];
}
