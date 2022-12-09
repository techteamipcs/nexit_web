import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product: any;
  backendURL = '';
  constructor(public router: ActivatedRoute, public dataservice: DataService) {
    this.backendURL = environment.backendUrl+'/public/';
   }

  ngOnInit() {
    this.productId = this.router.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProductByID();
    }
  }

  getProductByID() {
    let obj = {
      id: this.productId
    };
    this.dataservice.getProductByID(obj).subscribe((response) => {
      if (response.code == 200) {
        if (response.result) {
          this.product = response.result;
        }

      } else if (response.code == 400) {

      }
      else {

      }
    },
    );
  }

}
