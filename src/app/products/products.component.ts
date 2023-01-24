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
  currentLimit: number = 30;
  totalRecord: number = 0;
  selectedcategory:any = [];
  selectedbrand:any = [];
  selectedprice:any;
  filteredProducts:any = [];
  isFilter = false;
  totalProducts:any = [];
  isloadMore:boolean = true;
  category:any;
  allsubcategories:any = [];

  constructor(public dataservice: DataService, public router: ActivatedRoute, public route: Router) {
    this.backendURL = environment.backendUrl + '/public/';
    this.userSubscription = this.router.params.subscribe(
      (params: Params) => {
        this.type = this.router.snapshot.paramMap.get('type');
        this.id = this.router.snapshot.paramMap.get('id');
        this.getAllProducts();
        this.getAllCategory();
        this.get_AllBrands();
        this.getAllsubCategory();
        this.getFilterdProducts('');
      });      
  }

  ngOnInit() {
    window.scroll(0,0);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.getFilterdProducts('');
    // this.getAllProducts();
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
          this.allProducts = [];
          this.allProducts = this.products;
          this.totalRecord = response?.count;
          this.filteredProducts = this.products;
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
    if(!this.isFilter){
      this.isFilter = true;
      this.products = [];
    }
    this.dataservice.getFilteredProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.totalRecord = response?.count;
          if(response.result && response.result.length > 0 ){
            response.result.forEach((prod:any) => {
                if(prod){
                  let tempProd = this.products.filter((item:any)=>item._id == prod._id);
                  if(!tempProd[0]){
                    this.products.push(prod);
                  }
                }
            });
          }
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
            if(this.type == 'category'){
              let tempcat = this.allcategories.filter((item:any) => item._id == this.id);
              if(tempcat && tempcat[0]){
                this.category = tempcat[0];
              }
            }
          }

        } else if (response.code == 400) {

        }
        else {

        }

      },
    );
  }

  getAllsubCategory() {
    this.dataservice.getAllSubCategory({}).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result && response.result.length > 0) {
            this.allsubcategories = response.result;
            if(this.type == 'sub-category'){
              let tempcat = this.allsubcategories.filter((item:any) => item._id == this.id);
              if(tempcat && tempcat[0]){
                this.category = tempcat[0];
              }
            }
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
            if(this.type == 'category'){
              let tempcat = this.allbrands.filter((item:any) => item._id == this.id);
              if(tempcat && tempcat[0]){
                this.category = tempcat[0];
              }
            }
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
    if (this.totalProducts && this.totalProducts.length > 0) {
      this.totalProducts.forEach((prod: any) => {
        if (prod && prod.category == catId) {
          length = length + 1;
        }
      })
    }
    return length;
  }

  // selectBrand(brand:any){
  //   this.selectedbrand = brand;
  //   this.getProductsByCategories('brand');
  // }

  // selectCategory(category:any){
  //   this.selectedcategory = category;
  //   this.getProductsByCategories('category')
  // }

  // selectPrice(){
  //   this.getProductsByCategories('price')
  // }

  selectBrand(brand:any){
    this.selectedbrand = brand;
    this.getProductsByCategories('brand');
  }

  selectFilter(event:any, Ids:any,type:any){
    let tempCatProducts:any = [];
    let tempBandProducts:any = [];
    let tempProductswithbrandcat:any = [];
    this.isloadMore = false;
    if(type == 'category') {
      if(event && event.currentTarget.checked){
        this.selectedcategory.push(Ids);
      } else {
        var removeIndex = this.selectedcategory.map((item:any) => item).indexOf(Ids);
        this.selectedcategory.splice(removeIndex, 1);
      }
    } else if(type == 'brand') {
      if(event && event.currentTarget.checked){
        this.selectedbrand.push(Ids);
      } else {
        var removeIndex = this.selectedbrand.map((item:any) => item).indexOf(Ids);
        this.selectedbrand.splice(removeIndex, 1);
      }
    }
    if(this.selectedcategory && this.selectedcategory.length > 0){
      this.selectedcategory.forEach((cat:any)=>{
        if(cat){
          let tempPrd = this.totalProducts.filter((item:any)=> item.category_id == cat);
          if(tempPrd.length > 0){
            tempCatProducts = tempCatProducts.concat(tempPrd);
          }
        }
      });
    }
    if(this.selectedbrand && this.selectedbrand.length > 0 && this.selectedcategory.length > 0){
      this.selectedbrand.forEach((brand:any)=>{
          let tempprod = tempCatProducts.filter((item:any)=> item.brand_id == brand);
          if(tempprod[0]){
            tempProductswithbrandcat = tempProductswithbrandcat.concat(tempprod);
          }
      });
    } else {
      if(this.selectedbrand && this.selectedbrand.length > 0){
        this.selectedbrand.forEach((brand:any) => {
          let tempPrd = this.totalProducts.filter((item:any)=> item.brand_id == brand);
            if(tempPrd.length > 0){
              tempBandProducts = tempBandProducts.concat(tempPrd);
            } else {
              this.products = [];
            }
        });
      }
    }

    if(this.selectedcategory.length > 0){
      this.products = tempCatProducts;
    }
    if(this.selectedbrand.length > 0){
      this.products = tempBandProducts;
    } 
    if(this.selectedbrand.length > 0 && this.selectedcategory.length > 0){
      this.products = tempProductswithbrandcat;
    } 
    if(this.selectedcategory.length < 1 && this.selectedbrand.length < 1){
      this.isloadMore = true;
      this.getFilterdProducts('');
    }
    this.filteredProducts = this.products;
  }

  selectPrice(){
    if(this.filteredProducts && this.filteredProducts.length > 0 ){
      this.products = [];
      this.filteredProducts.forEach((item:any) => {
        if(item && item.sale_price >= this.minValue && item.sale_price <= this.maxValue){
          this.products.push(item);
        }
      })
    }
  }

  clearBrand(){

  }

  clearCaterory(){
    
  }

  onListChangeLimit(event: any) {
    this.currentLimit = parseInt(event.target.value);
    let obj = {
      sort: '',
      type: this.type,
      _id: this.id,
      limit: this.currentLimit,
      page: this.currentPage
    }
    this.dataservice.getFilteredProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.products = response.result;
          this.allProducts = [];
          this.allProducts = this.products;
          this.totalRecord = response?.count;
          this.filteredProducts = this.products;
          this.selectFilter('','','');
        }else {
          this.products = [];
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
    // this.getAllProducts();
  }

  // getAllProductswithoutpage() {
  //   const obj = {};
  //   this.dataservice.getAllProductswithoutpage(obj).subscribe((response) => {
  //     if (response.code == 200) {
  //       if (response.result && response.result.length > 0) {
  //         this.products = response.result;
  //         this.allProducts = [];
  //         this.allProducts = this.products;
  //         this.totalRecord = response?.count;
  //       } else {
  //         this.allProducts = [];
  //         this.products = [];
  //       }

  //     } else if (response.code == 400) {

  //     }
  //     else {

  //     }
  //   },
  //   );
  // }
  

  getAllProducts() {
    const obj = {
      limit: 2000,
      page: this.currentPage
    };
    this.dataservice.getAllProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.totalProducts = [];
          this.totalProducts = response.result;
          this.totalRecord = response?.count;
        }
      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }

  loadMore(){
    this.currentLimit = this.currentLimit + 30;
    this.getMoreProducts();
  }
  
  getMoreProducts() {
    let obj = {
      sort: '',
      type: this.type,
      _id: this.id,
      limit: this.currentLimit,
      page: this.currentPage
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
  
}
