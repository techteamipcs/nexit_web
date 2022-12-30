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
  allProducts: any = [];
  // price ranger
  value: number = 70;
  minValue: number = 5000;
  maxValue: number = 40000;
  options: Options = {
    floor: 0,
    ceil: 40000,
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
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  selectedcategory:any;
  selectedbrand:any;
  selectedprice:any;
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
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage
    };
    this.dataservice.getAllProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.products = response.result;
          this.allProducts = [];
          this.allProducts = this.products;
          this.totalRecord = response?.count;
        } else {
          this.allProducts = [];
          this.products = [];
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }

  getFilterdProducts(event: any) {
    let obj = {
      sort: '',
      type: this.type,
      _id: this.id,
      limit: this.currentLimit,
      page: this.currentPage
    }
    if (event) {
      obj['sort'] = event.target.value;
    }
    this.dataservice.getFilteredProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.products = response.result;
          this.totalRecord = response?.count;
        }else {
          this.products = [];
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }
  

  getProductsByCategories(filtertype:any) {
    let obj = {
      sort: '',
      type: 'filter',
      _id: this.id,
      catId:'',
      brandId:'',
      maxprice: this.maxValue,
      minprice: this.minValue,
      limit: this.currentLimit,
      page: this.currentPage
    }
    if(this.selectedbrand){
      obj['brandId'] = this.selectedbrand._id;
    }
    if(this.selectedcategory){
      obj['catId'] = this.selectedcategory._id;
    }
    this.dataservice.getFilteredProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.products = response.result;
          this.totalRecord = response?.count;
        } else {
          this.products = [];
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }


  selectBrand(brand:any){
    this.selectedbrand = brand;
    this.getProductsByCategories('brand');
  }

  selectCategory(category:any){
    this.selectedcategory = category;
    this.getProductsByCategories('category')
  }

  selectPrice(){
    this.getProductsByCategories('price')
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

  getCategoryLength(catId: any) {
    let length = 0;
    if (this.allProducts && this.allProducts.length > 0) {
      this.allProducts.forEach((prod: any) => {
        if (prod && prod.category == catId) {
          length = length + 1;
        }
      })
    }
    return length;
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.getAllProducts();
  }


  clearBrand(){

  }

  clearCaterory(){
    
  }
}
