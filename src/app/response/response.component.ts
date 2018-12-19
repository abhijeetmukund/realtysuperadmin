import { Component, OnInit,ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})

export class ResponseComponent implements OnInit {
  pageNo  = 1;
  dataSource = new MatTableDataSource();
  isLoading = true;
  cctld = 'in';
  countrySelected = 'in';
  countryList:object;
  searchString:string;

  displayedColumns: string[] = ['select', 'lead_id', 'property_unique_id', 'property_id','user_id','sender_id','leads_status_id','name','email','mobileno','type','applied_date1','applied_date','lead_ip_address','reported_as_broker_status','leads_score','calls','lead_prefer_timings','lead_prefer_bhk','lead_prefer_location','lead_prefer_budget','lead_prefer_service_type','property_suggested','property_visited1','property_visited2','property_visited3','allocate_person','visited_date'];
  selection = new SelectionModel<Element>(true, []);
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, public dialog: MatDialog, private httpService: HttpClient) { }

  myFiles:string [] = [];
  sMsg:string = '';

  connect(): Observable<User[]> {
    return this.dataService.getResponse(this.countrySelected, this.pageNo, '');
  }
  
  disconnect(){}

  ngOnInit() {
    this.dataService.getResponse(this.countrySelected, this.pageNo, '').subscribe(result => {
      this.isLoading = false;
      if(!result){
        return ;
      }
      console.log(result.length);
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

  applyFilter(filterValue) {
    this.dataService.getResponse(this.countrySelected, this.pageNo,filterValue).subscribe(result => {

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
    this.dataService.getResponse(this.countrySelected, this.pageNo, filterValue).subscribe(result => {

      if(!result){
        return ;
      }
    
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;

    })
  }

  pagePrevious(filterValue){  
    if(this.pageNo>=1){
      this.pageNo = this.pageNo - 1;
      this.dataService.getResponse(this.countrySelected, this.pageNo, filterValue).subscribe(result => {

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