import { Component, OnInit } from '@angular/core';
export interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	statuss: Status[] = [
	   {value: 'enable', viewValue: 'Enable'},
	   {value: 'disable', viewValue: 'Disable'},
	 ];
}
