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
  public commonURL: string = 'https://www.realtymonk.com/';
  private serviceUrl = '/websapi/freelisting/page/';
  private plansUrl = '/websapi/plan-wise-list/';
  private responseUrl = '/websapi/leadmanagement/';
  private usersTypeUrl = '/websapi/posted_by/';
  private serviceTypeUrl = '/websapi/services_type/';
  private propertyUrl = '/websapi/property_type/';
  private packersUrl = 'websapi/packagers-movers/';
  private packersIdUrl = 'websapi/packagers-movers/pkgid/';
  private addPackersUrl = 'https://www.realtymonk.com/websapi/add-packagers-movers';
  private packersEditUrl = 'websapi/update-packagers-movers';
  private loginUrl = 'https://www.realtymonk.com/websapi/authentication/login';
  private addLeadUrl = 'https://www.realtymonk.com/websapi/leadmanagement/new';
  private editLeadUrl = 'https://www.realtymonk.com/websapi/leadmanagement/edit/7147';
  private leadDeleteUrl = 'websapi/leadmanagement/delete/';

  private searchstring='';
  private headers;
  
  constructor(private http: HttpClient) {}

    appLogin(loginUser){
      const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = 'user_email='+loginUser.user_email+'&user_password='+loginUser.user_password;      
      return this.http.post<any>('https://www.realtymonk.com/websapi/authentication/login', body, {headers:header});

    }

    getPlans(){
      return this.http.get(this.commonURL + 'websapi/plans-list')
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

    // getUserw(countryCode:string, posted_by:string, PageNo?: number, filterValue?:string):Observable<User[]> {
    //   if(filterValue!=undefined && filterValue!= ''){
    //     return this.http.get<User[]>(this.commonURL + countryCode + this.usersTypeUrl + posted_by + PageNo + '/' + filterValue);
    //   } else{
    //     return this.http.get<User[]>(this.commonURL + countryCode + this.usersTypeUrl + posted_by + PageNo);
    //   }
    // }

    getService(countryCode:string, services_type:string, PageNo?: number, filterValue?:string, dateValue?:string):Observable<User[]> {
      if(filterValue!=undefined && filterValue!= '' && dateValue!=undefined && dateValue!= ''){
        this.searchstring =  '/' +filterValue + '-from-' + dateValue;
      } else if(filterValue!=undefined && filterValue!= ''){
        this.searchstring =  '/' +filterValue;
      } else if(dateValue!=undefined && dateValue!=''){
        this.searchstring = '/' + dateValue;
      } else{
        this.searchstring ='';
      }
      return this.http.get<User[]>(this.commonURL + countryCode + this.serviceTypeUrl + services_type + '/' + PageNo + this.searchstring);
    }

    getProperty(countryCode:string, property_type:string, PageNo?: number, filterValue?:string, dateValue?:string):Observable<User[]> {
      if(filterValue!=undefined && filterValue!= '' && dateValue!=undefined && dateValue!= ''){
        this.searchstring =  '/' +filterValue + '-from-' + dateValue;
      } else if(filterValue!=undefined && filterValue!= ''){
        this.searchstring =  '/' +filterValue;
      } else if(dateValue!=undefined && dateValue!=''){
        this.searchstring = '/' + dateValue;
      } else{
        this.searchstring ='';
      }
      return this.http.get<User[]>(this.commonURL + countryCode + this.propertyUrl + property_type + '/' + PageNo + this.searchstring);
    }

    getPlan(countryCode:string, premium_plan_id:string, PageNo?: number, filterValue?:string, dateValue?:string):Observable<User[]> {

      if(filterValue!=undefined && filterValue!= '' && dateValue!=undefined && dateValue!= ''){
        this.searchstring =  '/' +filterValue + '-from-' + dateValue;
      } else if(filterValue!=undefined && filterValue!= ''){
        this.searchstring =  '/' +filterValue;
      } else if(dateValue!=undefined && dateValue!=''){
        this.searchstring = '/' + dateValue;
      } else{
        this.searchstring ='';
      }
      return this.http.get<User[]>(this.commonURL + countryCode + this.plansUrl + premium_plan_id + '/' + PageNo +  this.searchstring);  

    }

    getResponse(countryCode:string, PageNo?: number, filterValue?:string, dateValue?:string):Observable<User[]> {
     
      if(filterValue!=undefined && filterValue!= '' && dateValue!=undefined && dateValue!= ''){
          this.searchstring =  '/' +filterValue + '-from-' + dateValue;
          return this.http.get<User[]>(this.commonURL + countryCode + this.responseUrl + PageNo +  this.searchstring);
      } else if(filterValue!=undefined && filterValue!= ''){
        this.searchstring =  '/' +filterValue;
        return this.http.get<User[]>(this.commonURL + countryCode + this.responseUrl + PageNo +  this.searchstring);
      } else if(dateValue!=undefined && dateValue!=''){
        this.searchstring = '/' + dateValue;
        return this.http.get<User[]>(this.commonURL + countryCode + this.responseUrl + PageNo +  this.searchstring);
      } else{
        this.searchstring ='';
        return this.http.get<User[]>(this.commonURL + countryCode + this.responseUrl + PageNo +  this.searchstring);
      }
      
    }

    getUserType(countryCode:string, posted_by:string, PageNo?: number, filterValue?:string, dateValue?:string):Observable<User[]> {

      if(filterValue!=undefined && filterValue!= '' && dateValue!=undefined && dateValue!= ''){
        this.searchstring =  '/' +filterValue + '-from-' + dateValue;
      } else if(filterValue!=undefined && filterValue!= ''){
        this.searchstring =  '/' +filterValue;
      } else if(dateValue!=undefined && dateValue!=''){
        this.searchstring = '/' + dateValue;
      } else{
        this.searchstring ='';
      }
      return this.http.get<User[]>(this.commonURL + countryCode + this.usersTypeUrl + posted_by + '/' + PageNo +  this.searchstring);

    }

    getPackers(PageNo?: number,filterValue?:string, dateValue?:string):Observable<User[]> {

      if(filterValue!=undefined && filterValue!= '' && dateValue!=undefined && dateValue!= ''){
        this.searchstring =  '/' +filterValue + '-from-' + dateValue;
      } else if(filterValue!=undefined && filterValue!= ''){
        this.searchstring =  '/' +filterValue;
      } else if(dateValue!=undefined && dateValue!=''){
        this.searchstring = '/' + dateValue;
      } else{
        this.searchstring ='';
      }
       return this.http.get<User[]>(this.commonURL + this.packersUrl + PageNo + this.searchstring);
 
    }

    getCountry(){
      return this.http.get<any>('./assets/countryList.json')
    }

    postEmployee(formData : Employee){
      return this.http.post(this.commonURL + this.packersIdUrl , formData);
    }

    refreshList(){
      this.http.get(this.commonURL + this.packersIdUrl)
      .toPromise().then(res => this.list = res as Employee[]);
    }
  
    addPackers(addPackers){
      const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let add = 'packer_name='+addPackers.packer_name+'&packer_email='+addPackers.packer_email+'&packer_mobile='+addPackers.packer_mobile+'&packer_location_from='+addPackers.packer_location_from+'&packer_location_to='+addPackers.packer_location_to+'&contacted_date='+addPackers.contacted_date+'&VehicleNo='+addPackers.VehicleNo+'&VehicleType='+addPackers.VehicleType+'&DriverName='+addPackers.DriverName+'&payment='+addPackers.payment;
      return this.http.post<any>(this.addPackersUrl, add, {headers:header});
    }

    postUser(newUser){ 
      const header = new HttpHeaders().set('Content-Type',  'application/x-www-form-urlencoded');
      let body =  'user_email='+newUser.user_email+'&user_password='+newUser.user_password+'&user_status='+newUser.user_status+'&u_firstname='+newUser.u_firstname+'&u_lastname='+newUser.u_lastname+'&u_mobile_no='+newUser.u_mobile_no;
      return this.http.post<any>('https://www.realtymonk.com/websapi/authentication/addnewadmin', body, {headers:header}); 
    } 

    postNewPassword(insertPassword){
      const header = new HttpHeaders().set('Content-Type',  'application/x-www-form-urlencoded');
      let body =  'current_password='+insertPassword.current_password+'&user_email='+insertPassword.user_email+'&new_password='+insertPassword.new_password+'&confirm_password='+insertPassword.confirm_password;
      return this.http.post<any>('https://www.realtymonk.com/websapi/authentication/update-passwrd', body, {headers:header});
    }

    addLeads(addLeads){
      const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let add = 'receiver_id='+addLeads.receiver_id+'&user_id='+sessionStorage.getItem('loginuser')+'&name='+addLeads.name+'&email='+addLeads.email+'&mobileno='+addLeads.mobileno+'&applied_date='+addLeads.applied_date+'&calls='+addLeads.calls+'&lead_prefer_timings='+addLeads.lead_prefer_timings+'&lead_prefer_bhk='+addLeads.lead_prefer_bhk+'&lead_prefer_location='+addLeads.lead_prefer_location+'&lead_prefer_budget='+addLeads.lead_prefer_budget+'&lead_prefer_service_type='+addLeads.lead_prefer_service_type+'&property_suggested='+addLeads.property_suggested+'&property_visited1='+addLeads.property_visited1+'&property_visited2='+addLeads.property_visited2+'&property_visited3='+addLeads.property_visited3+'&allocate_person='+addLeads.allocate_person+'&visited_date='+addLeads.visited_date+'&visting_time='+addLeads.visting_time+'&follow_up1='+addLeads.follow_up1+'&follow_up2='+addLeads.follow_up2+'&follow_up3='+addLeads.follow_up3+'&status='+addLeads.status+'&portal_details='+addLeads.portal_details+'&allocationpersonemail='+addLeads.allocationpersonemail+'&allocationpersonphoneno='+addLeads.allocationpersonphoneno;
      return this.http.post<any>(this.addLeadUrl, add, {headers:header});
    }

    getLeadId(lead_id){
      return this.http.get('https://www.realtymonk.com/websapi/leadmanagement/edit/'+lead_id)
    }

    editLeads(editLeads){
      const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let add = 'lead_id='+editLeads.lead_id+'&receiver_id='+editLeads.receiver_id+'&created_date='+editLeads.created_date+'&user_id='+sessionStorage.getItem('loginuser')+'&created_by='+sessionStorage.getItem('loginuser')+'&name='+editLeads.name+'&email='+editLeads.email+'&mobileno='+editLeads.mobileno+'&applied_date='+editLeads.applied_date+'&calls='+editLeads.calls+'&lead_prefer_timings='+editLeads.lead_prefer_timings+'&lead_prefer_bhk='+editLeads.lead_prefer_bhk+'&lead_prefer_location='+editLeads.lead_prefer_location+'&lead_prefer_budget='+editLeads.lead_prefer_budget+'&lead_prefer_service_type='+editLeads.lead_prefer_service_type+'&property_suggested='+editLeads.property_suggested+'&property_visited1='+editLeads.property_visited1+'&property_visited2='+editLeads.property_visited2+'&property_visited3='+editLeads.property_visited3+'&allocate_person='+editLeads.allocate_person+'&visited_date='+editLeads.visited_date+'&visting_time='+editLeads.visting_time+'&follow_up1='+editLeads.follow_up1+'&follow_up2='+editLeads.follow_up2+'&follow_up3='+editLeads.follow_up3+'&status='+editLeads.status+'&modified_by='+sessionStorage.getItem('loginuser')+'&portal_details='+editLeads.portal_details+'&allocationpersonemail='+editLeads.allocationpersonemail+'&allocationpersonphoneno='+editLeads.allocationpersonphoneno;
      return this.http.post<any>(this.editLeadUrl, add, {headers:header});
    }

    deleteLead(lead_id){
      return this.http.get(this.commonURL + this.leadDeleteUrl + lead_id);
    }

}

export interface User{}
export interface User2{}