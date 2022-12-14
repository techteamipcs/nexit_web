import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'brands',
    component:BrandsComponent
  },
  {
    path:'product-details',
    component:ProductDetailsComponent
  },
  {
    path:'product-details/:id',
    component:ProductDetailsComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'products/:id/:type',
    component:ProductsComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'privacy-policy',
    component:PrivacyPolicyComponent
  },
  {
    path:'terms-conditions',
    component:TermsAndConditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
