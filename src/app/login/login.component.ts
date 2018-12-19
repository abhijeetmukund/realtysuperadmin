import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import {AppComponent} from './../app.component';

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
  isloginid ="";
  userid="";
  constructor(private http: HttpClient, private router: Router, private data: DataService,private app: AppComponent) { 
    
    this.isloginid = localStorage.getItem('isLoggedIn');
    this.userid = localStorage.getItem('loginuser');
  
    if(this.isloginid =='false' && (this.userid =="" || this.userid==null) ){
      this.router.navigate(["/"]);   
    } else{
      this.router.navigate(["/content"]);   
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
        if(vlidtea  != 'NO' && stst ==200){
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('loginuser', data.data.user_id);
          localStorage.setItem('AdminName', data.data.u_first_name);
          localStorage.setItem('AdminEmail', data.data.user_email);
            this.router.navigate(["/content"]); 
          } else{
            localStorage.setItem('isLoggedIn', "false");
            alert('Invalid Credentials');
          }        
      
      });

    } else{
      alert("Fields are compulsary");
    }
  }

}