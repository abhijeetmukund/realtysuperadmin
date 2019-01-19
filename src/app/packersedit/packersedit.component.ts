import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-packersedit',
  templateUrl: './packersedit.component.html',
  styleUrls: ['./packersedit.component.scss']
})
export class PackerseditComponent implements OnInit {

  user: object;

  constructor(private data: DataService, private toastr: ToastrService) {
   
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.data.formData = {
      packer_id: null,
      packer_name: '',
      packer_email: '',
      packer_mobile: null,
      packer_location_from: '',
      packer_location_to: '',
      contacted_date: '',
      VehicleNo: '',
      VehicleType: '',
      DriverName: '',
      payment: null
    }
  }

}