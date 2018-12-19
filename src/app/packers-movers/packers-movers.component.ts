import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { PackerseditComponent } from './../packersedit/packersedit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Employee } from './../employee.model';
import { ToastrService } from 'ngx-toastr';

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
  styleUrls: ['./packers-movers.component.scss']
})

export class PackersMoversComponent implements OnInit {

  dateRange = '';
  public activeElement = '';
  users: object;
  user$: object;
  pageNo  = 1;
  isLoading = true;
  searchString:string;
  cctld ='in';

	dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'packer_id', 'packer_unique_id', 'packer_name','packer_email','packer_mobile','packer_location_from','packer_location_to','contacted_date','VehicleNo','VehicleType','DriverName','payment'];
  selection = new SelectionModel<User>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog, private httpService: HttpClient, private toastr: ToastrService) {
    this.route.params.subscribe( params => this.user$ = params.id );
  }

  myFiles:string [] = [];
  sMsg:string = '';
  
  connect(): Observable<User[]> {
    return this.dataService.getPackers(this.pageNo);
  }

  disconnect(){}

  ngOnInit() {

    this.dataService.refreshList();

    // this.options = {
    //   theme: 'default',
    //   range: 'tm',
    //   dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //   presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
    //   dateFormat: 'y-m-d',
    //   outputFormat: 'YYYY-MM-DD',
    //   startOfWeek: 1
    // }

    // this.dataService.getPlans().subscribe(
    //   dataService => this.users = dataService 
    // );

    this.dataService.getPackers(this.pageNo).subscribe(result => {
      this.isLoading = false;
      if(!result){
        return ;
      }
     
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    }) 

  }

  populateForm(emp: Employee) {
    this.dataService.formData = Object.assign({}, emp);
    console.log(emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.dataService.deleteEmployee(id).subscribe(res => {
        this.dataService.refreshList();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
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

  applyFilterPlan(filterValue) {

    this.dataService.getPackers(this.pageNo,filterValue).subscribe(result => {
      if(!result){
        return ;
      }

      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  // changeCountry(filterValue,cctld) {    
  //   this.dataService.getUser(this.pageNo,filterValue,cctld).subscribe(result => {
  //     if(!result){
  //       return ;
  //     }
  //     this.dataSource= new MatTableDataSource(result);
  //     this.dataSource.sort= this.sort;
  //     this.dataSource.paginator=this.paginator;
  //   })

  // }

  pageNext(filterValue){
    this.pageNo = this.pageNo + 1;
    this.dataService.getPackers(this.pageNo, filterValue).subscribe(result => {

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
      this.dataService.getPackers(this.pageNo, filterValue).subscribe(result => {

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

  openPackersEditPopup(){
    this.dialog.open(PackerseditComponent,  { disableClose: true });
  }

}

export interface User{}