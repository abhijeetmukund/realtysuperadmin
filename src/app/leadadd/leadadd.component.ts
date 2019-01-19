import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-leadadd',
  templateUrl: './leadadd.component.html',
  styleUrls: ['./leadadd.component.scss']
})
export class LeadaddComponent implements OnInit {

  public addLead : any;
  @ViewChild('form') formValues;

  constructor(private dataService: DataService) {
    this.addLead = {
      "receiver_id": "",
      "user_id": "",
      "name": "",
      "email": "",
      "mobileno": "",
      "applied_date": "",
      "calls": "",
      "lead_prefer_timings": "",
      "lead_prefer_bhk": "",
      "lead_prefer_location": "",
      "lead_prefer_budget": "",
      "lead_prefer_service_type": "",
      "property_visited1": "",
      "property_visited2": "",
      "property_visited3": "",
      "allocate_person": "",
      "visited_date": "",
      "visting_time": "",
      "follow_up1": "",
      "follow_up2": "",
      "follow_up3": "",
      "status": "",
      "portal_details": "RealtyMonk",
      "allocationpersonemail": "",
      "allocationpersonphoneno": ""
    }
  }

  ngOnInit() {
  }

  addLeads(){
    this.dataService.addLeads(this.addLead).subscribe(data => {
      data => this.addLead = data;
      this.formValues.resetForm();
      $("#packs_mvs_sec_tion").hide();
    });
  }

  cancelAddPopup(){
    $("#packs_mvs_sec_tion").hide();
  }

}
