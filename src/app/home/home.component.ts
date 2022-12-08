import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  apiData: PhotosApi;
  limit: number = 10; // <==== Edit this number to limit API results
  baseUrl:any;
  slides:any=[];
  recentslider:any=[];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }
  constructor(private renderer: Renderer2,private readonly http: HttpClient,) {
    this.slides.push(
      {id: 1, img: "https://via.placeholder.com/600/92c952"},
      {id: 2, img: "https://via.placeholder.com/600/92c952"},
      {id: 3, img: "https://via.placeholder.com/600/92c952"},
      {id: 4, img: "https://via.placeholder.com/600/92c952"},
      {id: 5, img: "https://via.placeholder.com/600/92c952"},
      {id: 6, img: "https://via.placeholder.com/600/92c952"},
      {id: 7, img: "https://via.placeholder.com/600/92c952"},
      {id: 8, img: "https://via.placeholder.com/600/92c952"},
      {id: 9, img: "https://via.placeholder.com/600/92c952"},
      {id: 10, img: "https://via.placeholder.com/600/92c952"}
      );
      
   }

   ngOnInit() {
    this.fetch()
  }
  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    http$.subscribe(
      res => this.apiData = res,
      err => throwError(err)
    )
  }



  slides1 = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
