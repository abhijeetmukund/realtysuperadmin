import { Component, OnInit, Inject, OnDestroy, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  isloginid = false;
  userid = '';
  adminName = '';
  adminEmail = '';
  countryCode = 'in';

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

    this.userid = sessionStorage.getItem('loginuser');
    this.adminName = sessionStorage.getItem('AdminName');
    this.adminEmail = sessionStorage.getItem('AdminEmail');

    console.log(this.adminName);

    if(this.isloginid ==false && (this.userid =="" || this.userid ==null)){
      this.router.navigate(["/"]);
    } 
    else{
      // this.router.navigate(["/content"]);
    }
    
    this.data.getUsers().subscribe(data => {
        this.users = data
      }
    );

  }

  logout() {
    this.isloginid = false;
    sessionStorage.removeItem('loginuser');
    this.router.navigate(["/"]);
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
    this.dialog.open(UserProfileComponent);
   this.logoutProfile=!this.logoutProfile;
  }

}