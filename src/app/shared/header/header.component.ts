import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/providers/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  allcategories: any = [];
  allsubcategories: any = [];
  allbrands: any = [];
  baseUrl: any;
  backendUrl: any;
  currentPage: number = 1;
  currentLimit: number = 6;
  constructor(private dataservice: DataService, public route:Router) {
    this.baseUrl = environment.baseUrl + '/assets';
    this.backendUrl = environment.backendUrl + '/public/';
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.get_AllBrands();
    this.getAllSubCategory();
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
  
  getAllSubCategory() {
    this.dataservice.getAllSubCategory({}).subscribe(
      (response) => {
        if (response.code == 200) {

          if (response.result && response.result.length > 0) {
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

  navigateTOproduct(id:any,type:any){
    this.route.navigate(['/products',id,type])
  }
}
