import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuardService implements CanActivate {
    status:boolean; 
    constructor(private router: Router) {
 
    }
 
    canActivate(route: ActivatedRouteSnapshot): boolean {            
        let authInfo = {
            isloginid : localStorage.getItem('isLoggedIn'),
            userid :  localStorage.getItem('loginuser')            
        };       
        if (authInfo.isloginid && (authInfo.userid != '' || authInfo.isloginid != null)) {          
            this.status= true;
        } else{
            this.status= false;
        } 
 
        return this.status;
        this.router.navigate(['/']);
 
    }
 
}