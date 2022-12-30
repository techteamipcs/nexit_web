import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';

@Component({
	selector: 'app-brand-details',
	templateUrl: './brand-details.component.html',
	styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {

	allbrands: any = [];
	brandId: any;
	brands: any;
	baseUrl: any;
	backendUrl: any;
	type: any;
	id: any;
	currentPage: number = 1;
	currentLimit: number = 10;
	totalRecord: number = 0;
	products: any = [];
	// router: any;
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
			this.getProductsByBrandId(this.brandId);
		}
	}


	getBrandById() {
		let obj = {
			id: this.brandId
		}

		let currentstate = this;
		this.dataservice.getBrandById(obj).subscribe((response) => {
			if (response.code == 200) {
				if (response.result) {
					this.brands = response.result;
				} else {

				}
			} else {

			}
		})
	}

	getProductsByBrandId(event: any) {
		let obj = {
			sort: '',
			_id: this.brandId,
			limit: this.currentLimit,
			page: this.currentPage
		}
		// if (event) {
		// 	obj['sort'] = event.target.value;
		// }
		this.dataservice.getBrandProducts(obj).subscribe(
			(response => {
				if (response.code == 200) {
					if (response.result && response.result.length > 0) {
						this.products = response.result;
						this.totalRecord = response?.count;
					} else {
						this.products = [];
					}
				} else if (response.code == 400) {
					console.log('Error 400');

				} else {
					console.log('Error');
				}
			}
			)
		)
	}

}
