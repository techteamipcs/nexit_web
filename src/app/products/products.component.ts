import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';
declare var $: any;
import { Options, LabelType } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  allcategories: any = [];
  allbrands: any = [];
  backendURL = '';
  type: any;
  id: any;
  userSubscription: Subscription;
  allProducts:any = []; 
// price ranger
  value: number = 70;
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };
  constructor(public dataservice: DataService, public router: ActivatedRoute, public route: Router) {
    this.backendURL = environment.backendUrl + '/public/';
    this.userSubscription = this.router.params.subscribe(
      (params: Params) => {
        this.type = this.router.snapshot.paramMap.get('type');
        this.id = this.router.snapshot.paramMap.get('id');
        if (this.type) {
          this.getAllProducts();
          this.getFilterdProducts('');
        } else {
          this.getAllProducts();
        }
      })
  }
  
  ngOnInit() {
  this.getAllCategory();
  this.get_AllBrands();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  getAllProducts() {
    this.dataservice.getAllProducts({}).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.products = response.result;
          this.allProducts = [];
          this.allProducts = this.products;
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }


  getFilterdProducts(event:any) {
    let obj = {
      sort:'',
      type: this.type,
      _id: this.id
    }
    if(event){
      obj['sort'] = event.target.value;
    }
    this.dataservice.getFilteredProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
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

        }
        else {

        }
      },
    );
  }

  getCategoryLength(catId:any){
    let length = 0;
    if(this.allProducts && this.allProducts.length > 0){
      this.allProducts.forEach((prod:any)=>{
        if(prod && prod.category == catId){
          length = length+1;
        }
      })
    }
    return length;
  }
}
