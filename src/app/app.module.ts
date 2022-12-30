import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel'
// Needs to import the BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandsComponent } from './brands/brands.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
// Import the library
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
// Libraries include
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchProductComponent } from './search-product/search-product.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Error404Component } from './error404/error404.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BrandsComponent,
    ProductDetailsComponent,
    ProductsComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    AboutComponent,
    ServicesComponent,
    PaginationComponent,
    SearchProductComponent,
    Error404Component,
    BrandDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    NgxSliderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
