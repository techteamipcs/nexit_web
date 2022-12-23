import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() {
 
  
   }

  ngOnInit(): void {
       // product-slider
       $('.product-slider').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: false,
        nextArrow: '<i class="fa fa-chevron-right arrow-right"></i>',
        prevArrow: '<i class="fa fa-chevron-left arrow-left"></i>',
    
      });
  }

}
