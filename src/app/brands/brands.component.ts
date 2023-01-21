import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { environment } from '../../environments/environment';
import { DataService } from '../providers/data.service';

@Component({
	selector: 'app-brands',
	templateUrl: './brands.component.html',
	styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
	allbrands: any = [];
	brandId: any;
	brands: any;
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
		this.brandId = this.router.snapshot.paramMap.get('id');
		if (this.brandId) {
			this.getBrandById();
		}
		this.get_AllBrands();
		window.scroll(0,0);
	}

	get_AllBrands() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.dataservice.getAllBrands(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result && response.result.length > 0) {
						this.allbrands = response.result;
					}

				} else if (response.code == 400) {

				} else {

				}
			},
		);
	}

	getBrandById() {
		let obj = {
			id: this.allbrands
		}

		let currentstate = this;
		this.dataservice.getBrandById(obj).subscribe((response) => {
			if (response.code == 200) {
				if (response.result) {
					this.brands = response.result;
				} else {

				}
			} else if (response.code == 400) {

			} else {

			}
		})
	}

}
