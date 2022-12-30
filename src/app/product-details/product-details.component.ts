import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../providers/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrderService } from '../order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
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
	addContactForm: FormGroup;
	throw_msg: any;
	submitted = false;
	error = {};
	constructor(
		public router: ActivatedRoute,
		public dataservice: DataService,
		private orderservice: OrderService,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager
	) {
		this.backendURL = environment.backendUrl + '/public/';
	}

	ngOnInit() {
		this.productId = this.router.snapshot.paramMap.get('id');
		if (this.productId) {
			this.getProductByID();
		}
		this.addContactForm = this.formBuilder.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
			subject: ['Product Enquiry', Validators.required],
			phone: ['', Validators.required],
			message: [''],
			product_id: ['']
		});
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
					// this.slides.push({ img: this.backendURL + this.product.image })
					if (this.product && this.product.product_gallery.length > 0) {
						this.product.product_gallery.forEach((prodimage: any,index:any) => {
							if (prodimage && index <= 3 ) {
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

	onSubmit() {
		this.submitted = true;
		let obj = this.addContactForm.value;
		obj['product_id'] = this.product._id;
		obj['product_type'] = this.product.product_type;
		obj['brand_name'] = this.product.brand_name;
		obj['product_name'] = this.product.name;
		obj['regular_price'] = this.product.regular_price;
		obj['sale_price'] = this.product.sale_price;
		if (this.addContactForm.invalid) {
			return false;
		}
		return this.orderservice.orderMail(obj).subscribe(response => {
			if (response && response.body.code == 200) {
				this.submitted = true;
				this.toastr.successToastr(response.body.message);
				setInterval(() => {
					window.location.reload();
				}, 2000);

			} else {
				this.toastr.errorToastr("Error");
			}
		},
			error => this.error = error
		);
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addContactForm.controls[controlName].hasError(errorName);
	};

	public hasEmailError = (controlName: string, errorName: string) => {
		if (this.addContactForm.controls['email'].value == "") {
			return "Email is required";
		} else if (this.addContactForm.controls['email'].status == "INVALID") {
			return "Invalid Email";
		} else {
			return this.addContactForm.controls['email'].hasError(errorName);
		}

	};

}
