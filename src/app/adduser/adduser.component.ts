import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { StringDecoder } from 'string_decoder';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

export interface Status {
  value: string;
  viewValue: string;
} 

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})

export class AdduserComponent implements OnInit {

  @ViewChild('form') formValues;
  selected = 'none';
  public newUser: any;
  user: string;
  add_user_hide = true;
  add_user_cnfm_hide= true;

  constructor(private formBuilder: FormBuilder,private data:DataService, private httpClient:HttpClient,private router: Router) {
    
    this.newUser= {
      'user_email': '',
      'user_password': '',
      'user_status': '',
      'u_firstname': '',
      'u_lastname': '',
      'u_mobile_no': ''
    }

  }

  ngOnInit() {
  }

  addUser(){
    this.data.postUser(this.newUser).subscribe(data=>{
      data => this.newUser = data;
      console.log(data);
      this.formValues.resetForm();
    })
  }

  stats: Status[] = [
    {value: '0', viewValue: 'Inactive'},
    {value: '1', viewValue: 'Active'},
  ];

}
