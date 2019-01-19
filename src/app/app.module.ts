import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { SubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material';
import { FreeListingComponent } from './free-listing/free-listing.component';
import { PremiumListingComponent } from './premium-listing/premium-listing.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { ListingTypeComponent } from './listing-type/listing-type.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { MultiListingComponent } from './multi-listing/multi-listing.component';
import { ResponseComponent } from './response/response.component';
import { ProjectComponent } from './project/project.component';
import { PackersMoversComponent } from './packers-movers/packers-movers.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { HomeDecoreComponent } from './home-decore/home-decore.component';
import { HomeMaintenanceComponent } from './home-maintenance/home-maintenance.component';
import { VehicleServiceComponent } from './vehicle-service/vehicle-service.component';
import { RentalAgreementComponent } from './rental-agreement/rental-agreement.component';
import { OutPostingComponent } from './out-posting/out-posting.component';
import { CorporateEnquireComponent } from './corporate-enquire/corporate-enquire.component';
import { BlogComponent } from './blog/blog.component';
import { AdsComponent } from './ads/ads.component';
import { SettingsComponent } from './settings/settings.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditComponent } from './edit/edit.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDonutChartModule } from 'ngx-doughnut-chart';
import { ChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';
import { CKEditorModule } from 'ngx-ckeditor';
import { GoogleChart } from './content/angular2-google-chart.directive.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { PopupComponent } from './popup/popup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewBlogsComponent } from './view-blogs/view-blogs.component';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { TestComponent } from './test/test.component';
import { PlansComponent } from './plans/plans.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { ClickOutsideModule } from 'ng4-click-outside';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NgDateRangePickerModule } from 'ng-daterangepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { PackerseditComponent } from './packersedit/packersedit.component';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from './data.service';
import { LogComponent } from './log/log.component';
import {NgXDonutChartModule} from 'ngx-donutchart';
import { SubmenuComponent } from './submenu/submenu.component';
import { PackersaddComponent } from './packersadd/packersadd.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {MatTreeModule} from '@angular/material/tree';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ShippingManagementComponent } from './shipping-management/shipping-management.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FaqManagementComponent } from './faq-management/faq-management.component';
import { BlockCopyPasteDirective } from './changepassword/block-copy-paste.directive';
import { LeadaddComponent } from './leadadd/leadadd.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { EditleadComponent } from './editlead/editlead.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgAutoCompleteModule} from "ng-auto-complete";

@NgModule({ 
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    SubHeaderComponent,
    SubSidebarComponent,
    FreeListingComponent,
    PremiumListingComponent,
    AddSubscriptionComponent,
    ListingTypeComponent,
    UserTypeComponent,
    ServiceTypeComponent,
    PropertyTypeComponent,
    MultiListingComponent,
    ResponseComponent,
    ProjectComponent,
    PackersMoversComponent,
    FurnitureComponent,
    HomeDecoreComponent,
    HomeMaintenanceComponent,
    VehicleServiceComponent,
    RentalAgreementComponent,
    OutPostingComponent,
    CorporateEnquireComponent,
    BlogComponent,
    AdsComponent,
    SettingsComponent,
    EditComponent,
    GoogleChart,
    ModalComponent,
    PopupComponent,
    UserProfileComponent,
    ViewBlogsComponent,
    AddPermissionComponent,
    TestComponent,
    PlansComponent,
    ChangepasswordComponent,
    PackerseditComponent,
    LoginComponent,
    LogComponent,
    SubmenuComponent,
    PackersaddComponent,
    AdduserComponent,
    ErrorpageComponent,
    ProductManagementComponent,
    ShippingManagementComponent,
    TermsConditionsComponent,
    FaqManagementComponent,
    BlockCopyPasteDirective,
    LeadaddComponent,
    ForgotpasswordComponent,
    EditleadComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxPaginationModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxDonutChartModule,
    NgxChartsModule,
    NgxDonutChartModule,
    ChartsModule,
    MatTabsModule,
    CKEditorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ClickOutsideModule,
    NgDateRangePickerModule,
    NgxDaterangepickerMd,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxMatDrpModule,
    GooglePlaceModule,
    MatIconModule,
    NgXDonutChartModule,
    MatTreeModule,
    MatAutocompleteModule,
    NgAutoCompleteModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [PopupComponent, EditComponent, PackerseditComponent, PackersaddComponent, UserProfileComponent, LeadaddComponent, EditleadComponent, UserdetailsComponent],
  providers: [
    HeaderComponent,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }