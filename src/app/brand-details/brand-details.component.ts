import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

}
