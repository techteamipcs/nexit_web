import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { CategoriesService } from '../../providers/categories.service';
import { BrandsService } from '../../providers/brands.service';
import { SubCategoriesService } from '../../providers/sub-categories.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  allcategories:any=[];
  allsubcategories:any=[];
  allbrands:any=[];
  baseUrl:any;
  backendUrl:any;
  currentPage: number = 1; 
	currentLimit: number = 6;
  constructor( private categoriesservice:CategoriesService,private brandsservice:BrandsService,private subcategoriesservice:SubCategoriesService) {
    this.baseUrl=environment.baseUrl + '/assets';
    this.backendUrl=environment.backendUrl + '/public/';
   }

  ngOnInit(): void {
    this.getAllCategory();
    this.get_AllBrands();
    this.getAllSubCategory();
  }
  getAllCategory() {
    
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.categoriesservice.getAllCategory(obj).subscribe(
        (response) => {
            if (response.code == 200) {
  
              if(response.result && response.result.length > 0){
                this.allcategories = response.result;                
              }
  
            } else if (response.code == 400) {
              
            }
            else {
  
            }
  
        },
    );
  }
  getAllSubCategory() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.subcategoriesservice.getAllSubCategory(obj).subscribe(
        (response) => {
            if (response.code == 200) {
  
              if(response.result && response.result.length > 0){
                this.allsubcategories = response.result;                
              }
  
            } else if (response.code == 400) {
              
            }
            else {
  
            }
  
        },
    );
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
