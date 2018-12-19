import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { EditComponent } from './../edit/edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { HeaderComponent } from './../header/header.component';
import { NgModel } from '@angular/forms';
import { Moment } from 'moment';


export interface Listing {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

export interface countryList{
  value: string;
  countryname: string;
} 

@Component({
  providers:[ HeaderComponent ],
  selector: 'app-multi-listing', 
  templateUrl: './multi-listing.component.html',
  styleUrls: ['./multi-listing.component.scss']
}) 

export class MultiListingComponent implements OnInit {
  
  selected: {start: Moment, end: Moment};
  // Moment(selected).format('YYYY-MM-DD');

  // isTimePickerEnabled = false;
  // daterangepickerOptions = {
  //   startDate: null,
  //   endDate: null,
  //   format: "YYYY-MM-DD",
  //   minDate: moment().add(-2, 'months').format("YYYY-MM-DD"),
  //   maxDate: moment().add(2, 'months').format("YYYY-MM-DD"),
  //   inactiveBeforeStart: true,
  //   autoApply: true,
  //   showRanges: true,
  //   preDefinedRanges: [{
  //     name: 'Day After tomorrow',
  //     value: {
  //       start: moment().add(2, 'days'),
  //       end: moment().add(2, 'days'),
  //     }
  //   }, {
  //     name: 'Today',
  //     value: {
  //       start: moment(),
  //       end: moment(),
  //     }
  //   }, {
  //     name: 'Tomorrow',
  //     value: {
  //       start: moment().add(1, 'days'),
  //       end: moment().add(1, 'days'),
  //     }
  //   }, {
  //     name: 'This week',
  //     value: {
  //       start: moment(),
  //       end: moment().add(7, 'days'),
  //     }
  //   }],
  //   singleCalendar: false,
  //   displayFormat: 'YYYY-MM-DD',
  //   // position: 'left',
  //   disabled: false,
  //   noDefaultRangeSelected: true,
  //   disableBeforeStart: true
  // }
  // rangeSelected(data) {
    
  // }
  // singleCalendar(event) {
  //   this.daterangepickerOptions.singleCalendar = event.target.checked;
  // }
  // autoApply(event) {
  //   this.daterangepickerOptions.autoApply = event.target.checked;
  // }
  // inactiveBeforeStart(event) {
  //   this.daterangepickerOptions.inactiveBeforeStart = event.target.checked;
  // }
  // showRanges(event) {
  //   this.daterangepickerOptions.showRanges = event.target.checked;
  // }
  
  // prettyPrintJSON(object) {
  //   return JSON.stringify(object, null, '  ')
  // }

  // options: NgDateRangePickerOptions;

  // options: any = {
  //   autoApply: false,
  //   alwaysShowCalendars: false,
  //   showCancel: false,
  //   showClearButton: false,
  //   linkedCalendars: true,
  //   singleDatePicker: false,
  //   showWeekNumbers: false,
  //   showISOWeekNumbers: false
  // };
  // minDate: moment.Moment = moment().subtract(5, 'days');
  // maxDate: moment.Moment = moment().add(2, 'month');
  // locale: any = {
  //   format: 'DD MMMM YYYY HH:mm',
  //   separator: ' To ',
  //   cancelLabel: 'Cancel',
  //   applyLabel: 'Okay'
  // }
  // opens: string;
  // drops: string;
  // timePicker: boolean;
  // click() {
  // }
  // selected = {start: moment().subtract(3, 'days'), end: moment().add(3, 'days') };
  // @ViewChild(DaterangepickerDirective) daterangepicker: DaterangepickerDirective;

  

  date: string;
  countryList:Object;
  public activeElement = '';
  users: object;
  user$: object;
  pageNo  = 1;
  isLoading = true;
  searchString:string;
  countrySelected = 'in';

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

 
 constructor(private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog, private httpService: HttpClient, private header: HeaderComponent) {
    this.route.params.subscribe( params => this.user$ = params.id );
    // this.timePicker = false;
    // this.opens = 'right';
    // this.drops = 'down';
  }

  // clear(): void {
  //   this.daterangepicker.clear();
  // }

  myFiles:string [] = [];
  sMsg:string = '';
  
  connect(): Observable<User[]> {
    return this.dataService.getUser(this.countrySelected, this.pageNo,'', this.date);
  }

  disconnect(){}

  ngOnInit() {
    
    // this.options = {
    //   theme: 'default',
    //   range: 'tm',
    //   dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //   presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
    //   dateFormat: 'y-m-d',
    //   outputFormat: 'YYYY-MM-DD',
    //   startOfWeek: 1
    // }

    this.dataService.getCountry().subscribe(data => {
      this.countryList=data
    });

    this.dataService.getPlans().subscribe(
      dataService => this.users = dataService 
    );

    this.dataService.getUser(this.countrySelected, this.pageNo,'', this.date).subscribe(result => {
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

  planNext(pid:string){
    this.isLoading = true;
    pid!= 'all';
    this.pageNo = 1;
    this.activeElement = pid;
    this.searchString = '';  
    this.dataService.getPlan(this.countrySelected, pid, this.pageNo, '').subscribe(result => {
      this.isLoading = false;
      if(!result){
        return ;
      }
    
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  userNext(utid:string){
    this.dataService.getUserType(this.countrySelected, utid, this.pageNo).subscribe(result => {

      if(!result){
        return ;
      }
    
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  applyFilterPlan(filterValue) {

    this.dataService.getPlan(this.countrySelected, this.activeElement || 'all', this.pageNo, filterValue).subscribe(result => {
      if(!result){
        return ;
      }

      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  filterByDate(filterValue) {

    this.dataService.getPlan(this.countrySelected, this.activeElement || 'all', this.pageNo, filterValue, this.date).subscribe(result => {
      if(!result){
        return ;
      }

      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  changeCountry(countryCode, filterValue) {    
    this.dataService.getUser(countryCode, this.pageNo,filterValue).subscribe(result => {
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
    this.dataService.getPlan(this.countrySelected, this.activeElement || 'all', this.pageNo, filterValue).subscribe(result => {

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
      this.dataService.getPlan(this.countrySelected, this.activeElement || 'all', this.pageNo, filterValue).subscribe(result => {

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
    this.dialog.open(PopupComponent,  { disableClose: true });
  }

  openEditPopup(){
    this.dialog.open(EditComponent,  { disableClose: true });
  }

}

// $(function() {
//   $('input[name="daterange"]').daterangepicker(
//     {
//         locale: {
//           format: 'YYYY-MM-DD'
//         },
//         startDate: '2013-01-01',
//         endDate: '2013-12-31'
//     }, 
//     function(start, end, label) {
//        let date = start.format('YYYY-MM-DD') + '-to-' + end.format('YYYY-MM-DD');
//        alert(date);
//        return date;
//     });
// });

export interface User{}