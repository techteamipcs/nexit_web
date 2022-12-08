import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { CategoriesService } from '../../providers/categories.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  allcategories:any=[];
  baseUrl:any;
  backendUrl:any;
  currentPage: number = 1; 
	currentLimit: number = 6;
  constructor( private categoriesservice:CategoriesService) {
    this.baseUrl=environment.baseUrl + '/assets';
    this.backendUrl=environment.backendUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_AllProjects();
  }
  get_AllProjects() {
    
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
}
