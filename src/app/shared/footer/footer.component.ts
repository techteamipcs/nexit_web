import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/providers/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  allcategories: any = [];
  allbrands: any = [];
  baseUrl: any;
  backendUrl: any;
  currentYear = new Date().getFullYear(); // 2020
  constructor(private dataservice: DataService, public route:Router) { 
    this.baseUrl = environment.baseUrl + '/assets';
    this.backendUrl = environment.backendUrl + '/public/';
  }
  
  ngOnInit(): void {
    this.getAllCategory();
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
}
