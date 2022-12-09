import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel'
// Needs to import the BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandsComponent } from './brands/brands.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent} from './products/products.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BrandsComponent,
    ProductDetailsComponent,
    ProductsComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    SlickCarouselModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
