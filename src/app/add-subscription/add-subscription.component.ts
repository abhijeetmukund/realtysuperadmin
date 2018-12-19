import { Component, OnInit } from '@angular/core';
export interface Listing {
  value: string;
  viewValue: string;
}
export interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
   listings: Listing[] = [
   {value: 'Free Listing', viewValue: 'Free Listing'},
   {value: 'Premium Listing', viewValue: 'Premium Listing'},
   {value: 'Express Tenancy', viewValue: 'Express Tenancy'},
   {value: 'Elite Listing', viewValue: 'Elite Listing'}
 ];
 statuss: Status[] = [
  {value: 'enable', viewValue: 'Enable'},
  {value: 'disable', viewValue: 'Disable'},
];
  constructor() { }

  ngOnInit() {
  }

}
