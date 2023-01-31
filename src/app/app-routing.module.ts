import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { BrandsComponent } from './brands/brands.component';
import { ContactComponent } from './contact/contact.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ServicesComponent } from './services/services.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'services',
    component:ServicesComponent
  },
  {
    path:'brands',
    component:BrandsComponent
  },
  {
    path:'brands/:id',
    component:BrandDetailsComponent
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
  },
  {
    path:'search',
    component:SearchProductComponent
  },
  {
    path:'search/:key',
    component:SearchProductComponent
  },
  {
    path:'**',
    component:Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
