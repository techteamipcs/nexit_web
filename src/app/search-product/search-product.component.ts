import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';
declare var $: any;
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  products: any = [];
  allcategories: any = [];
  allbrands: any = [];
  backendURL = '';
  key: any;
  id: any;
  userSubscription: Subscription;
  allProducts: any = [];
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
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  name:any;
  searchText:any;
  constructor(public dataservice: DataService, public router: ActivatedRoute, public route: Router) {
    this.backendURL = environment.backendUrl + '/public/';
    this.userSubscription = this.router.params.subscribe(
      (params: Params) => {
        this.key = this.router.snapshot.paramMap.get('key');
        this.id = this.router.snapshot.paramMap.get('id');
        if (this.key) {
          this.searchText = this.key;
          this.getProducts();
        } else {
          this.getProducts();
        }
      })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  getProducts() {
    const obj = {
      name: this.name,
    };
    this.dataservice.getSearchProducts(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result && response.result.length > 0) {
          this.products = response.result;
          this.allProducts = [];
          this.allProducts = this.products;
          this.totalRecord = response?.count;
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }

  onSearch(){
    
  }

}
