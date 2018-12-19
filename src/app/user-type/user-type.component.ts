import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

export interface Listing {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})

export class UserTypeComponent implements OnInit {
  
  selectedItem = 'owner/';
  users: object;
  user$: object;
  pageNo  = 1;
  isLoading = true;
  searchString:string;
  cctld = 'in';
  countrySelected = 'in';
  countryList: object;

	dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'property_details_id', 'posted_by', 'posted_date','property_name','contact_name','contact_number','location','contact_email','city','login_id'];
  selection = new SelectionModel<Element>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog, private httpService: HttpClient) {
    this.route.params.subscribe( params => this.user$ = params.id );
  }

  myFiles:string [] = [];
  sMsg:string = '';
  
  connect(): Observable<User[]> {
    return this.dataService.getUserw(this.countrySelected, 'owner/', this.pageNo, '');
  }

  disconnect(){}

  ngOnInit() {

    this.dataService.getCountry().subscribe(data => {
      this.countryList=data
    });

    this.dataService.getUserw(this.countrySelected, 'owner/', this.pageNo, '').subscribe(result => {
      this.isLoading = false;
      if(!result){ 
        return ;
      }
     
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  getFileDetails (e) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append("filename", this.myFiles[i]);
    }
  
    this.httpService.post('https://www.realtymonk.com/websapi/freelisting/import', frmData).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log (this.sMsg);
      }
    );
  }

  userNext(utid:string){
    this.isLoading = true;
    this.selectedItem = utid;
    this.pageNo = 1;
    this.searchString = '';

    this.dataService.getUserType(this.countrySelected, utid, this.pageNo, '').subscribe(result => {
      this.isLoading = false;
      if(!result){
        return ;
      }
    
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  changeCountry(countryCode, filterValue) {    
    this.dataService.getUserType(countryCode, this.selectedItem, this.pageNo, filterValue).subscribe(result => {
      if(!result){
        return ;
      }
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  applyFilterPlan(filterValue) {
    
    this.dataService.getUserw(this.countrySelected, this.selectedItem, this.pageNo,filterValue).subscribe(result => {
      if(!result){
        return ;
      }

      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  pageNext(filterValue){
    this.pageNo = this.pageNo + 1;
    this.dataService.getUserw(this.countrySelected, this.selectedItem, this.pageNo, filterValue).subscribe(result => {

      if(!result){
        return ;
      }
      
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  pagePrevious(filterValue){  
    if(this.pageNo>=2){
      this.pageNo = this.pageNo - 1;
      this.dataService.getUserw(this.countrySelected, this.selectedItem, this.pageNo, filterValue).subscribe(result => {

        if(!result){
          return ;
        }
        console.log(result.length);
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      })
    }
  }

  openModal(){
    this.dialog.open(PopupComponent);
  }
    
}
export interface User{}