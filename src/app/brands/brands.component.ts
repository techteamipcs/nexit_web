import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import {environment} from '../../environments/environment';
import { BrandsService } from '../providers/brands.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  allbrands:any=[];
  baseUrl:any;
  backendUrl:any;
  currentPage: number = 1; 
	currentLimit: number = 6;
  constructor(private brandsservice:BrandsService) {
    this.baseUrl=environment.baseUrl + '/assets';
    this.backendUrl=environment.backendUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_AllBrands();
  }
  get_AllBrands() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.brandsservice.getAllBrands(obj).subscribe(
        (response) => {
            if (response.code == 200) {
              if(response.result && response.result.length > 0){
                this.allbrands = response.result;                
              }
  
            } else if (response.code == 400) {
              
            }
            else {
  
            }
        },
    );
  }
}
