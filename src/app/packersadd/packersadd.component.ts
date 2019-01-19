import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-packersadd',
  templateUrl: './packersadd.component.html',
  styleUrls: ['./packersadd.component.scss']
})
export class PackersaddComponent implements OnInit {

  public addPackers : any;
  @ViewChild('form') formValues;

  constructor(private dataService: DataService) { 
    this.addPackers = {
      'packer_name' : '',
      'user_password' : '',
      'packer_mobile': '',
      'packer_location_from': '',
      'packer_location_to': '',
      'contacted_date': '',
      'VehicleNo': '',
      'VehicleType': '',
      'DriverName': '',
      'payment': ''
    }
  }

  ngOnInit() {
  }

  addPackersMovers(){
    this.dataService.addPackers(this.addPackers).subscribe(data => {
      data => this.addPackers = data;
      this.formValues.resetForm();
      console.log(data);
    });
  }

}
