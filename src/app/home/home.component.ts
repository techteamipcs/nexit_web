import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DataService } from '../providers/data.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { PageService } from '../providers/page/page.service';

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
  allbrands: any = [];
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    margin: 14,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
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
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      768: {
        items: 3,
        margin: 8,
      },
      1023: {
        items: 4
      }
    },
    nav: false
  }
  brandSlider: OwlOptions = {
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
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      768: {
        items: 3,
        margin: 8,
      },
      1023: {
        items: 6
      }
    },
    nav: false
  }
  config:any;
  imageUrl:any ='';
  products:any = [];
  allcategories:any = [];
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  constructor(private renderer: Renderer2,private readonly http: HttpClient, public dataservice: DataService, 
    private pageservice: PageService,
    private metaTagService: Meta,
    private titleService: Title,) {
    this.baseUrl = environment.baseUrl + '/assets';
    this.imageUrl = environment.backendUrl+'/public';    
   }

   ngOnInit() {
    this.fetch();
    this.getConfig();
    this.getProducts();
    this.getAllCategory();
    this.get_PageMeta();
    this.get_AllBrands();
  }

  get_PageMeta() {
    let obj = { pageName: 'home' };
    this.pageservice.getpageWithName(obj).subscribe(
        (response) => {
            if (response.body.code == 200) {
                this.titleService.setTitle(response?.body.result.meta_title);
                this.metaTagService.addTags([
                    { name: 'description', content: response?.body.result.meta_description },
                    { name: 'keywords', content: response?.body.result.meta_keywords },
                ]);
            } else if (response.body.code == 400) {
            }
            else {

            }

        },
    );
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
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage
    };
    this.dataservice.getConfigData(obj).subscribe((response) => {
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

  getProducts(){
    this.dataservice.getAllProducts({}).subscribe((response) => {
      if (response.code == 200) {
        if (response.result) {
          this.products = response.result;
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }

  getAllCategory() {
    this.dataservice.getAllCategory({}).subscribe(
      (response) => {
        if (response.code == 200) {

          if (response.result && response.result.length > 0) {
            this.allcategories = response.result;
          }

        } else if (response.code == 400) {

        }
        else {

        }

      },
    );
  }

  get_AllBrands() {
    this.dataservice.getAllBrands({}).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result && response.result.length > 0) {
            this.allbrands = response.result;
          }

        } else if (response.code == 400) {
          console.log('400');
        }
        else {
          console.log('error');
        }
      },
    );
  }
  
}
