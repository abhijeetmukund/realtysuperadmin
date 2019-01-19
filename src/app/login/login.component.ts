import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import {AppComponent} from './../app.component';
import {HeaderComponent} from './../header/header.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit { 

  hide_pass_wrd = true;
  public loginDetails : any;
  // isloginid = false;
  userid="";
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router, private data: DataService,private app: AppComponent, private head: HeaderComponent) { 
    
    // this.isloginid = sessionStorage.getItem('isLoggedIn');
    this.userid = sessionStorage.getItem('loginuser');
  
    if(this.head.isloginid ==false && (this.userid =="" || this.userid==null) ){
      this.router.navigate(["/"]);
    } else{
      // this.router.navigate(["/content"]);
    }

    this.loginDetails = {
      'user_email' : '',
      'user_password' : '',
    }

  }

  ngOnInit() {
    
  }

  login(){
    
    if(this.loginDetails.user_email !="" && this.loginDetails.user_password !="") {
      this.data.appLogin(this.loginDetails).subscribe(data => {
        data => this.loginDetails = data;
          let vlidtea = data.data;
          let stst = data.status;
          // let adminName = data.data[0].u_first_name;
          // let adminEmail = data.data[0].user_email;
  
        if(vlidtea  != 'NO' && stst ==200){
          
            // sessionStorage.setItem('isLoggedIn', "true");
            this.head.isloginid = true;
            sessionStorage.setItem('loginuser', data.data[0].user_id);
            sessionStorage.setItem('AdminName', data.data[0].u_first_name);
            sessionStorage.setItem('AdminEmail', data.data[0].user_email);
            this.router.navigate(["/content"]);
          } else{
            // sessionStorage.setItem('isLoggedIn', "false");
            this.head.isloginid = false;
            alert('Invalid Credentials');
          }
      });

    } else{
      alert("Fields are compulsary");
    }
  }

}