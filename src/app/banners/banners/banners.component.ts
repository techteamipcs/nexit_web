import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { environment } from '../../../environments/environment';
import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

  allbrands: any = [];
	brandId: any;
	allbanner: any;
	baseUrl: any;
	backendUrl: any;
	currentPage: number = 1;
	currentLimit: number = 6;
	constructor(
		private dataservice: DataService,
		public router: ActivatedRoute
	) {
		this.baseUrl = environment.baseUrl + '/assets';
		this.backendUrl = environment.backendUrl + '/public/';
	}

  ngOnInit(): void {
    this.get_AllBanner();
		window.scroll(0,0);
  }
  get_AllBanner() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.dataservice.getAllBanners(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result && response.result.length > 0) {
						this.allbanner = response.result;
					}

				} else if (response.code == 400) {

				} else {

				}
			},
		);
	}
}
