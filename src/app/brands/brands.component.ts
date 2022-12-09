import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { DataService } from '../providers/data.service';

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
  constructor(private dataservice:DataService) {
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
    this.dataservice.getAllBrands(obj).subscribe(
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
