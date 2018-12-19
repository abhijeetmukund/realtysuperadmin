import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  formData  : Employee;
  list : Employee[];
  user_email: string;
  user_password: string;
  private commonURL: string = 'https://www.realtymonk.com/';
  private serviceUrl = '/websapi/freelisting/page/';
  private plansUrl = '/websapi/plan-wise-list/';
  private responseUrl = '/websapi/leadmanagement/';
  private usersTypeUrl = '/websapi/posted_by/';
  private serviceTypeUrl = '/websapi/services_type/';
  private propertyUrl = '/websapi/property_type/';
  private packersUrl = 'websapi/packagers-movers/';
  private packersIdUrl = 'websapi/packagers-movers/pkgid/';
  private editUrl = 'https://www.realtymonk.com/api/leadmanagement/edit/';
  private addPackersUrl = 'https://www.realtymonk.com/websapi/add-packagers-movers';
  private packersEditUrl = 'websapi/update-packagers-movers';
  private loginUrl = 'https://www.realtymonk.com/websapi/authentication/login';
  private headers;
  
  constructor(private http: HttpClient) {}

    appLogin(loginUser){
      const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = 'user_email='+loginUser.user_email+'&user_password='+loginUser.user_password;      
      return this.http.post<any>('https://www.realtymonk.com/websapi/authentication/login', body, {headers:header});

    }

    getPlans(){
      return this.http.get(this.commonURL + 'websapi/plans-list/')
    }

    getUsers(){
      return this.http.get(this.commonURL + '/websapi/freelisting/menu')
    }

    getInExcelData() {
      return this.http.get<User[]>(this.serviceUrl + 1);
    }

    getUser(countryCode:string, PageNo?: number, filterValue?:string, date?:string):Observable<User[]> {

      if(filterValue!=undefined && filterValue!= '' && date!=undefined && date!=''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + 'all/' + PageNo+'/' + filterValue + '-from-' + date);
      }

      else if(filterValue==undefined && filterValue== '' && date!=undefined && date!=''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + 'all/' + PageNo + '/' + date);
      }

      else if(filterValue!=undefined && filterValue!= '' && date==undefined && date==''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + 'all/' + PageNo + '/' + filterValue);
      }

      else{
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + 'all/' + PageNo);
      }
    }

    getUserw(countryCode:string, posted_by:string, PageNo?: number, filterValue?:string):Observable<User[]> {
      if(filterValue!=undefined && filterValue!= ''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.usersTypeUrl + posted_by + PageNo + '/' + filterValue);
      } else{
        return this.http.get<User[]>(this.commonURL + countryCode + this.usersTypeUrl + posted_by + PageNo);
      }
    }

    getService(countryCode:string, services_type:string, PageNo?: number, filterValue?:string):Observable<User[]> {
      if(filterValue!=undefined && filterValue!= ''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.serviceTypeUrl + services_type + '/' + PageNo + '/' + filterValue);
      } else{
        return this.http.get<User[]>(this.commonURL + countryCode + this.serviceTypeUrl + services_type + '/' + PageNo);
      }
    }

    getProperty(countryCode:string, property_type:string, PageNo?: number, filterValue?:string):Observable<User[]> {
      if(filterValue!=undefined && filterValue!= ''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.propertyUrl + property_type + '/' + PageNo + '/' + filterValue);
      } else{
        return this.http.get<User[]>(this.commonURL + countryCode + this.propertyUrl + property_type + '/' + PageNo);
      }
    }

    // getPlan(countryCode:string, premium_plan_id:string, PageNo: number, filterValue?:string):Observable<User[]> {
      
    //   if(filterValue!=undefined && filterValue!= ''){ 
    //     filterValue ='/'+ filterValue;
    //   }else{
    //     filterValue="";
    //   }
    //   return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + premium_plan_id + '/' + PageNo + filterValue);

    // }

    getPlan(countryCode:string, premium_plan_id:string, PageNo?: number, filterValue?:string, date?:string):Observable<User[]> {

      if(filterValue!=undefined && filterValue!= '' && date!=undefined && date!=''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + premium_plan_id + '/' + PageNo + '/' + filterValue + '-from-' + date);
      }

      else if(filterValue==undefined && filterValue== '' && date!=undefined && date!=''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + premium_plan_id + '/' + PageNo + '/' + date);
      }

      else if(filterValue!=undefined && filterValue!= '' && date==undefined && date==''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + premium_plan_id + '/' + PageNo + '/' + filterValue);
      }

      else{
        return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + premium_plan_id + '/' + PageNo);
      }
    }

    getResponse(countryCode:string, PageNo?: number, filterValue?:string):Observable<User[]> {
      
      if(filterValue!=undefined && filterValue!= ''){
        return this.http.get<User[]>(this.commonURL + countryCode + this.responseUrl + PageNo + '/' + filterValue);
      } else{
        return this.http.get<User[]>(this.commonURL + countryCode + this.responseUrl + PageNo);
      }

    }

    getUserType(countryCode:string, posted_by:string, PageNo?: number, filterValue?:string):Observable<User[]> {

     if(filterValue!=undefined && filterValue!= ''){ 
        filterValue ='/'+ filterValue;
      }else{
        filterValue="";
      }
      return this.http.get<User[]>(this.commonURL + countryCode + this.usersTypeUrl + posted_by + '/' + PageNo + filterValue);

    }

    getPackers(PageNo?: number,filterValue?:string):Observable<User[]> {

      if(filterValue!=undefined){ 
         filterValue ='/'+ filterValue;
       }else{
         filterValue="";
       }
       return this.http.get<User[]>(this.commonURL + this.packersUrl + PageNo + filterValue);
 
    }

    getCountry(){
      return this.http.get<any>('./assets/countryList.json')
    }

    postEmployee(formData : Employee){
      return this.http.post(this.commonURL + this.packersIdUrl + '/Employee', formData);
    }

    refreshList(){
      this.http.get(this.commonURL + this.packersIdUrl +'/Employee')
      .toPromise().then(res => this.list = res as Employee[]);
    }
  
    putEmployee(formData : Employee){
      return this.http.put(this.commonURL + this.packersIdUrl +'/Employee/' + formData.packer_id, formData);
       
    }
  
    deleteEmployee(id : number){
      return this.http.delete(this.commonURL + this.packersIdUrl +'/Employee/' + id);
    }

    updateUser(lead_id: number, user: User, PageNo: number) {
      const urlParams = new HttpParams().set("lead_id", lead_id.toString());
      return this.http.post(this.editUrl + PageNo, user);
    }

}

export interface User{}
export interface User2{}