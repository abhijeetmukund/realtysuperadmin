import { Component, OnInit } from '@angular/core';
export interface category {
  value: string;
  viewValue: string;
}
export interface subcategory {
  value: string;
  viewValue: string;
}
export interface productname {
  value: string;
  viewValue: string;
}
export interface status {
  value: string;
  viewValue: string;
}
export interface faqcategory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-faq-management',
  templateUrl: './faq-management.component.html',
  styleUrls: ['./faq-management.component.scss']
})
export class FaqManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
categories: category[] = [
    {value: 'Furniture', viewValue: 'Furniture'},
    {value: 'Appliances', viewValue: 'Appliances'},
    {value: 'Combos', viewValue: 'Combos'},
    {value: 'Mobile', viewValue: 'Mobile'}
  ];
   subcategories: subcategory[] = [
    {value: 'Beds', viewValue: 'Beds'},
    {value: 'Sofas', viewValue: 'Sofas'},
    {value: 'Study', viewValue: 'Study'},
    {value: 'Mattresses', viewValue: 'Mattresses'},
    {value: 'Tables', viewValue: 'Tables'},
    {value: 'Dining', viewValue: 'Dining'},
    {value: 'chairs', viewValue: 'Chairs'},
    {value: 'Utility', viewValue: 'Store Utility'}
  ];
  products: productname[] = [
    {value: 'Fabric Sofa', viewValue: 'Fabric Sofa'},
    {value: 'Leather Sofa', viewValue: 'Leather Sofa'},
    {value: 'Bamboo Sofa Set', viewValue: 'Bamboo Sofa Set'},
    {value: 'Recliner Sofa Set', viewValue: 'Recliner Sofa Set'},
    {value: 'Divan Sofa Set', viewValue: 'Divan Sofa Set'},
    {value: 'L Shaped Sofa', viewValue: 'L Shaped Sofa'},
  ];
   statuss: status[] = [
    {value: 'Active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'In Active'},
  ];
  faqcategories: faqcategory[] = [
    {value: 'Pay_refund', viewValue: 'Payments & Refund'},
    {value: 'rent_tenure', viewValue: 'Rent & Tenure'},
    {value: 'rent_own', viewValue: 'Rent To Own'},
    {value: 'ser_maintain', viewValue: 'Service Maintenance'}
  ];
}
