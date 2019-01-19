import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../_services/authentication.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public loginDetails : any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    
  }

  ngOnInit() {

    this.loginDetails = { 
      'user_email' : '',
      'user_password' : '',
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.loginDetails)
        this.authenticationService.login(this.loginDetails)
            .pipe(first())
            .subscribe(
                data => {
                  let vlidtea = data.data;
                  let stst = data.status;
                  console.log(vlidtea);
                  console.log(stst);
                  if(vlidtea  != 'NO' && stst ==200){
                    this.router.navigate(["/"]);
                  }else{
                    this.router.navigate(["/log"]);
                  }
                },
                error => {
                  this.error = error;
                  this.loading = false;
              });
    }
}