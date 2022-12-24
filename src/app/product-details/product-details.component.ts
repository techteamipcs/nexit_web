import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
	productId: any;
	product: any;
	backendURL = '';
	productSlider: OwlOptions = {
		loop: true,
		autoplay: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		margin: 14,
		responsive: {
			0: {
				items: 2
			},
			400: {
				items: 3
			},
			740: {
				items: 4
			},
			940: {
				items: 4
			}
		},
		nav: false
	}
	slides: any = [];
	slideConfig: any;
	constructor(public router: ActivatedRoute, public dataservice: DataService) {
		this.backendURL = environment.backendUrl + '/public/';
	}

	ngOnInit() {
		this.productId = this.router.snapshot.paramMap.get('id');
		if (this.productId) {
			this.getProductByID();
		}
	}

	getProductByID() {
		let obj = {
			id: this.productId
		};
		let currentstate = this;
		this.dataservice.getProductByID(obj).subscribe((response) => {
			if (response.code == 200) {
				if (response.result) {
					this.slides = [];
					this.product = response.result;
					this.slides.push({ img: this.backendURL + this.product.image })
					if (this.product && this.product.product_gallery.length > 0) {
						this.product.product_gallery.forEach((prodimage: any) => {
							if (prodimage) {
								this.slides.push({ img: this.backendURL + prodimage })
							}
						});
						this.slideConfig =
						{
							'dots': true,
							'arrows': true,
							'slidesToShow': 1,
							'slidesToScroll': 1,
							'autoplay': false,
							'autoplaySpeed': false,
							'nextArrow': '<i class="fa fa-chevron-right arrow-right"></i>',
							'prevArrow': '<i class="fa fa-chevron-left arrow-left"></i>',
							'customPaging': function (slider: any, i: any) {
								var image = currentstate.getcustomPaging(i);
								return '<img class="img-fluid" src="' + image + '" alt="product-img">';
							}
						};
					}
				}
			} else if (response.code == 400) {

			}
			else {
			}
		},
		);
	}

	getcustomPaging(i: any) {
		let image = '';
		if (this.slides.length > 0) {
			this.slides.forEach(function (prodimage: any, index: any) {
				if (prodimage && i == index) {
					image = prodimage.img;
				}
			});
		}
		return image;
	}

	addSlide() {
		this.slides.push({ img: "http://placehold.it/350x150/777777" })
	}

	removeSlide() {
		this.slides.length = this.slides.length - 1;
	}

	slickInit(e: any) {
		console.log('slick initialized');
	}

	breakpoint(e: any) {
		console.log('breakpoint');
	}

	afterChange(e: any) {
		console.log('afterChange');
	}

	beforeChange(e: any) {
		console.log('beforeChange');
	}
}
