import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator,MatTableDataSource} from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {HttpErrorResponse} from '@angular/common/http';
import { DataService } from '../data.service';
import { HeaderComponent } from './../header/header.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  public insertPassword: any;
  collection = [];
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group

    let pass = group.controls.new_password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private formBuilder: FormBuilder, private data: DataService, private head: HeaderComponent) {
    this.insertPassword={
      'current_password':'',
      'new_password':'',
      'user_email':this.head.adminEmail,
      'condirm_password':''
    }
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
    this.myForm = this.formBuilder.group({
     current_password:['',[Validators.required]],
     new_password: ['', [Validators.required]],
     confirm_password: ['']
   }, { validator: this.checkPasswords });
  }
  
  hide = true;
  hides = true;
  hide_pass= true;

  ngOnInit() {
    this.head.adminEmail = sessionStorage.getItem('AdminEmail');
  }

  addNewPassword(){
    this.data.postNewPassword(this.insertPassword).subscribe(data=>{
      data=> this.insertPassword = data;
      console.log(data);
    })
  }
  
}

export interface Password{
  user_email:string;
  new_password:string;
  current_password:string;
  confirm_password:string;
}