import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ListingTypeComponent } from './listing-type/listing-type.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { OutPostingComponent } from './out-posting/out-posting.component';
import { PackersMoversComponent } from './packers-movers/packers-movers.component';
import { RentalAgreementComponent } from './rental-agreement/rental-agreement.component';
import { ProjectComponent } from './project/project.component';
import { ResponseComponent } from './response/response.component';
import { SettingsComponent } from './settings/settings.component';
import { BlogComponent } from './blog/blog.component';
import { AdsComponent } from './ads/ads.component';
import { HomeDecoreComponent } from './home-decore/home-decore.component';
import { VehicleServiceComponent } from './vehicle-service/vehicle-service.component';
import { CorporateEnquireComponent } from './corporate-enquire/corporate-enquire.component';
import { MultiListingComponent } from './multi-listing/multi-listing.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { HomeMaintenanceComponent } from './home-maintenance/home-maintenance.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component'; 
import { ViewBlogsComponent} from './view-blogs/view-blogs.component'; 
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { EditComponent } from './edit/edit.component';
import { PlansComponent } from './plans/plans.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginComponent } from './login/login.component';
import { PackerseditComponent } from './packersedit/packersedit.component';
import { LogComponent } from './log/log.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { ProductManagementComponent } from './product-management/product-management.component';
import { ShippingManagementComponent } from './shipping-management/shipping-management.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FaqManagementComponent } from './faq-management/faq-management.component';
import { AddPermissionComponent } from './add-permission/add-permission.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
		path: 'content',
		component: ContentComponent
	},
	{
		path:'edit', 
		component:EditComponent
	},
	{
		path:'view-blogs', 
		component:ViewBlogsComponent
	},
	{
		path:'user-profile', 
		component:UserProfileComponent
	},
	{
		path:'add-subscription', 
		component:AddSubscriptionComponent
	},
	{
		path:'listing-type', 
		component:ListingTypeComponent
	},
	{
		path:'user-type', 
		component:UserTypeComponent
	},
	{
		path:'service-type',
		component:ServiceTypeComponent
	},
	{
		path:'property-type',
		component:PropertyTypeComponent
	},
	{ 
		path:'multi-listing-services',
		component:MultiListingComponent
	},
	{ 
		path:'furniture',
		component:FurnitureComponent
	},
	{ 
		path:'product-management',
		component:ProductManagementComponent
	},
	{ 
		path:'shipping-management',
		component:ShippingManagementComponent
	},
	{ 
		path:'terms-conditions',
		component:TermsConditionsComponent
	},
	{ 
		path:'faq-management',
		component:FaqManagementComponent
	},
	{ 
		path:'settings',
		component:AddPermissionComponent
	},
	{ 
		path:'add_super_admin',
		component:AdduserComponent
	},
	{ 
		path:'response',
		component:ResponseComponent
	},
	{ 
		path:'packers-movers',
		component:PackersMoversComponent
	},
	{
		path:'blogs',
		component:BlogComponent
	},
	{
		path:'ads',
		component:AdsComponent
	},
	{
		path:'change_pass',
		component:ChangepasswordComponent
	},
	{
		path:'plans',
		component:PlansComponent
	},
	{ 
		path: '**',
		redirectTo: 'errorpage',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }