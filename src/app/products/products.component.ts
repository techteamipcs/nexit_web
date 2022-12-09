import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  backendURL = '';
  type: any;
  id: any;
  userSubscription: Subscription;
  constructor(public dataservice: DataService, public router: ActivatedRoute, public route: Router) {
    this.backendURL = environment.backendUrl + '/public/';
    this.userSubscription = this.router.params.subscribe(
      (params: Params) => {
        this.type = this.router.snapshot.paramMap.get('type');
        this.id = this.router.snapshot.paramMap.get('id');
        if (this.type) {
          this.getFilterdProducts();
        } else {
          this.getAllProducts();
        }
      })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  getAllProducts() {
    this.dataservice.getAllProducts({}).subscribe((response) => {
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


  getFilterdProducts() {
    let obj = {
      type: this.type,
      _id: this.id
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
