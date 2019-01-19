import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { PackerseditComponent } from './../packersedit/packersedit.component';
import { PackersaddComponent } from './../packersadd/packersadd.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Employee } from './../employee.model';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import { DatePipe } from "@angular/common";

export interface Listing {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-packers-movers',
  templateUrl: './packers-movers.component.html',
  styleUrls: ['./packers-movers.component.scss'],
  providers: [DatePipe]
})

export class PackersMoversComponent implements OnInit {

  selected: {start: Moment, end: Moment};
  lastAction: string;
  count=0;
  dateRange = '';
  public activeElement = '';
  users: object;
  user$: object;
  pageNo  = 1;
  isLoading = true;
  searchString:string;
  cctld ='in';
  toggleBool: boolean=true;
  checkVal = false;
  showTable: boolean = true;
  dateSelected = '';
  countrySelected = 'in';
  totCount: any;
  public totalCount = 0;
  myFiles:string [] = [];
  sMsg:string = '';

	dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'packer_id', 'packer_unique_id', 'packer_name','packer_email','packer_mobile','packer_location_from','packer_location_to','contacted_date','VehicleNo','VehicleType','DriverName','payment'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog, private httpService: HttpClient, private toastr: ToastrService, private datePipe: DatePipe) {
    this.route.params.subscribe( params => this.user$ = params.id );
  }
  
  ngOnInit() {

    this.dataService.getPackers(this.pageNo).subscribe(result => {
      result = this.totCount = result;
      let lastIndex = result.length - 1;
      this.totalCount = this.totCount[lastIndex].ttlleads;
      this.isLoading = false;
     
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  refreshData(){
    this.showTable = false;
    this.isLoading = true;
    this.searchString = '';
    this.dateSelected = '';
    this.dataService.getPackers(this.pageNo).subscribe(result => {
      result = this.totCount = result;
      this.totalCount = result.length-1;
      this.isLoading = false;
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });
    
    setTimeout(()=>{this.showTable = true; this.isLoading = false;}, 0);
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
        this.sMsg = data as string;
        console.log (this.sMsg);
      }
    );
  }

  applyFilterPlan(filterValue) {

    if(this.dateSelected !=undefined && this.dateSelected !=''){
      this.dateSelected =  this.dateSelected ;
    }
    else{
      this.dateSelected ='';
    }

    this.dataService.getPackers(this.pageNo,filterValue).subscribe(result => {
      if(result.length > 1){
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].ttlleads;
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
      else{
        this.totalCount=0;
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })

  }

  applyDate(startdate) {
        
    if(startdate.start!=undefined){
      this.dateSelected = this.datePipe.transform(startdate.start, 'yyyy-MM-dd') + '-to-' + this.datePipe.transform(startdate.end, 'yyyy-MM-dd');
    } else{
      this.dateSelected = ''; 
    }

    if(this.searchString!=undefined && this.searchString !=''){
      this.searchString=this.searchString;
    } else
    this.searchString='';

    this.dataService.getPackers(this.pageNo, this.searchString,this.dateSelected).subscribe(result => {
      if(result.length > 1){
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].ttlleads;
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
      else{
        this.totalCount=0;
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })
  }

  pageNext(filterValue){
    this.pageNo = this.pageNo + 1;
    this.dataService.getPackers(this.pageNo, filterValue).subscribe(result => {
      if(result.length > 1){
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].ttlleads; 
          this.dataSource= new MatTableDataSource(result);
          this.dataSource.sort= this.sort;
          this.dataSource.paginator=this.paginator;
        } else{
          (<HTMLInputElement>document.getElementById("next_response")).disabled=true; 
          this.pageNo = this.pageNo - 1;
      }
    })
  }

  pagePrevious(filterValue){
    if(this.pageNo>1){
      this.pageNo = this.pageNo - 1;
      this.dataService.getPackers(this.pageNo, filterValue).subscribe(result => {
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].ttlleads;
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      })
    }
    (<HTMLInputElement>document.getElementById("next_response")).disabled=false;
  }

  showNoData(){
   
    if(this.totalCount<=0  && this.isLoading == false)
        return true;
    else
        return false;
  }
  
  openModal(){
    this.dialog.open(PopupComponent,  { disableClose: true });
  }

  openAddModal(){
    this.dialog.open(PackersaddComponent,  { disableClose: true });
  }

  openPackersEditPopup(){
    this.dialog.open(PackerseditComponent,  { disableClose: true });
  }

}

export interface User{}