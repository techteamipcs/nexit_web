import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DataService } from '../providers/data.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { PageService } from '../providers/page/page.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

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
  allbanner: any = [];
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
        items: 2,
        margin: 5
      },
      400: {
        items: 2,
        margin: 5
      },
      480: {
        items: 2,
        margin: 5
      },
      740: {
        items: 3,
        margin: 5
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
  addSubscriberForm:FormGroup;
  throw_msg:any; 
  msg_success: boolean = false;
  msg_danger: boolean = false;
  subject:any = [];
  submitted = false;
  error = {};
  alltestimonials:any = [];
  constructor(private renderer: Renderer2,private readonly http: HttpClient, public dataservice: DataService, 
    private pageservice: PageService,
    private metaTagService: Meta,
    private titleService: Title,
    private toastr: ToastrManager,
    public formBuilder : FormBuilder,
    private spinner: NgxSpinnerService) {
    this.baseUrl = environment.baseUrl + '/assets';
    this.imageUrl = environment.backendUrl+'/public'; 
    this.addSubscriberForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
     });   
   }

   ngOnInit() {
    this.fetch();
    this.getConfig();
    this.getProducts();
    this.getAllCategory();
    this.get_PageMeta();
    this.get_AllBrands();
    this.get_AllBanner();
    this.get_AllTestimonials();
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
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage
    };
    this.spinner.show();
    this.dataservice.getFilteredProducts(obj).subscribe((response) => {
      this.spinner.hide();
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
            response.result.forEach((cat:any) => {
              if(this.allcategories.length <= 4){
                this.allcategories.push(cat);
              }
            });
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
  
  get_AllBanner() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.dataservice.getAllBanners(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result && response.result.length > 0) {
						this.allbanner = response.result;
					}

				} else if (response.code == 400) {
          console.log('400');
				} else {
          console.log('error');
				}
			},
		);
	}
  func_1(value:any){
    if(value && value.sequence_number == 1){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/server-green.svg");
    } else if(value && value.sequence_number == 2){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/networking-green1.svg");
    } else if(value && value.sequence_number == 3){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/laptop-green.svg");
    } else if(value && value.sequence_number == 4){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/pcs-green.svg");
    } else if(value && value.sequence_number == 5){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/networking-green1.svg");
    } 
}

  func_11(value:any){
    if(value && value.sequence_number){
    $(".cat_"+value.sequence_number).attr("src", this.imageUrl + "/" + value.icon);
    }
  }

  onSubmit() {
    this.submitted = true;
    let obj = this.addSubscriberForm.value;
    if (this.addSubscriberForm.invalid){
      return false;
    }    
    return this.dataservice.addSubscriber(obj).subscribe(response => {
      if (response && response.code == 200) {
        this.submitted = true;
        this.toastr.successToastr("Thank you For Subscribing with Us");
        setInterval(() => {
          window.location.reload();
        }, 2000);

      } else {
        this.toastr.errorToastr("Already Subscribed from this Email");
      }
    },
      error => this.error = error
    );
  }


  public hasEmailError = (controlName: string, errorName: string) => { 
    if(this.addSubscriberForm.controls['email'].value == "" ){
      return "Email is required";
    } else if(this.addSubscriberForm.controls['email'].status == "INVALID"){
      return "Invalid Email";
    } else {
      return this.addSubscriberForm.controls['email'].hasError(errorName);
    }
    
  };

  get_AllTestimonials() {
    let obj = {
      limit : 10,
      page : 1
    }
    this.dataservice.getAllTestimonials(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result && response.result.length > 0) {
            this.alltestimonials = response.result;
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
