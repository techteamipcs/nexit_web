import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product: any;
  backendURL = '';
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
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
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
