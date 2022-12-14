import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DataService } from '../providers/data.service';
import { environment } from 'src/environments/environment';
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
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 14,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      },
      740: {
        items: 8
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  productSlider: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 14,
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  config:any;
  imageUrl:any ='';
  constructor(private renderer: Renderer2,private readonly http: HttpClient, public dataservice: DataService) {
    this.baseUrl = environment.baseUrl + '/assets';
    this.imageUrl = environment.backendUrl+'/public';    
   }

   ngOnInit() {
    this.fetch();
    this.getConfig();

  }
  fetch() {
    // const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    // const http$ = this.http.get<PhotosApi>(api);

    // http$.subscribe(
    //   res => this.apiData = res,
    //   err => throwError(err)
    // )
  }
  getConfig(){
    this.dataservice.getConfigData({}).subscribe((response) => {
      if (response.code == 200) {
        if (response.result) {
          this.config = response.result;
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }
  
}
