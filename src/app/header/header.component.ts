import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { Router, ActivatedRoute } from '@angular/router';
//import { AuthGuardService } from './../auth/auth-guard.service';

export interface Food {
  value: string;
  viewValue: string;
}

export interface countryList{
  value: string;
  countryname: string;
} 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    countryList:Object;
    users: object;
    show_dialog: boolean = false; 
    logoutProfile: boolean = false; 
    categoryList: Object;
    headerItems: Object[] = [];
    countrySelected = '';
    pageNo = 1;
    isloginid = '';
    userid = '';
    

    constructor(private router: Router,private data: DataService, public dialog: MatDialog) {
     
     this.headerItems.push(
            { classes: 'navLink', routerLink: ['/mulit-listing'], text: 'Multi Listing' }
          );
        }

    dataSource = new MatTableDataSource();

    onClickedOutside(e: Event) {
       if(this.show_dialog == true){
        this.show_dialog=!this.show_dialog;
       }
    }

    onClickOutside(e: Event) {
      if(this.logoutProfile == true){
        this.logoutProfile=!this.logoutProfile;
      }
    }

 
 
  ngOnInit() {
    this.isloginid = localStorage.getItem('isLoggedIn');
    this.userid = localStorage.getItem('loginuser');
    if(this.isloginid =='false' && (this.userid =="" || this.userid ==null)){
      this.router.navigate(["/"]);   
    } 
    // else{
    //   this.router.navigate(["/content"]);   
    // }

    this.data.getCountry().subscribe(data => {
      this.countryList=data
    });
    
    this.data.getUsers().subscribe(data => {
        this.users = data
      }
    );

  }
  
  logout() {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('loginuser');
    this.router.navigate(["/"]);
  }

  changeCountry(countryCode, filterValue) {    
    this.data.getUser(countryCode, this.pageNo,filterValue).subscribe(result => {
      if(!result){
        return ;
      }
      this.dataSource= new MatTableDataSource(result);
      
    })

  }

  openModal(){
    this.dialog.open(PopupComponent);
  }
  toggle(){
    this.show_dialog=!this.show_dialog;
  }
  checkProfile(){
  this.logoutProfile=!this.logoutProfile;
  }
  closeProfile(){
   this.logoutProfile=!this.logoutProfile;
  }

}

export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('loginuser');
  }
}