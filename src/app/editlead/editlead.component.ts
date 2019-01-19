import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-editlead',
  templateUrl: './editlead.component.html',
  styleUrls: ['./editlead.component.scss']
})
export class EditleadComponent implements OnInit {

  public editLead : any;
  @ViewChild('form') formValues;

  constructor(private dataService: DataService) {
    this.editLead = {
      "lead_id": "",
      "receiver_id": "",
      "user_id": "",
      "sender_id": "",
      "leads_status_id": "",
      "name": "",
      "email": "",
      "mobileno": "",
      "type": "",
      "applied_date1": null,
      "applied_date": "",
      "lead_ip_address": null,
      "reported_as_broker_status": "",
      "leads_score": null,
      "calls": null,
      "lead_prefer_timings": null,
      "lead_prefer_bhk": null,
      "lead_prefer_location": null,
      "lead_prefer_budget": null,
      "lead_prefer_service_type": null,
      "property_suggested": null,
      "property_visited1": null,
      "property_visited2": null,
      "property_visited3": null,
      "allocate_person": null,
      "visited_date": "",
      "visting_time": null,
      "follow_up1": null,
      "follow_up2": null,
      "follow_up3": null,
      "status": "",
      "portal_details": "",
      "allocationpersonemail": null,
      "allocationpersonphoneno": null,
      "created_date": "",
      "created_by": "",
      "modified_date": null,
      "modified_by": null
    }
  }

  ngOnInit() {
  }

  editLeads(){
    this.dataService.editLeads(this.editLead).subscribe(data => {
      data => this.editLead = data;
      this.formValues.resetForm();
      console.log(data);
    });
  }

}
