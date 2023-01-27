import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from 'src/app/providers/data.service';
import { Router } from '@angular/router';
declare var $: any;
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
  func_1(value:any){
    if(value && value.sequence_number == 1){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/server-green.svg");
    } else if(value && value.sequence_number == 2){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/networking-green1.svg");
    } else if(value && value.sequence_number == 3){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/laptop-green.svg");
    } else if(value && value.sequence_number == 4){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/pcs-green.svg");
    } else if(value && value.sequence_number == 5){
      $(".cat_"+value.sequence_number).attr("src", this.baseUrl + "/source/images/icon/networking-green1.svg");
    } 
}

  func_11(value:any){
    if(value && value.sequence_number){
    $(".cat_"+value.sequence_number).attr("src", this.backendUrl + "/" + value.icon);
    }
  }
}
