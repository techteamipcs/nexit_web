import { Component, OnInit } from '@angular/core';
import { ContactService } from '../providers/contact/contact.service';
import { environment } from '../../environments/environment';
declare var $: any;
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  addContactForm:FormGroup;
  throw_msg:any; 
  msg_success: boolean = false;
  msg_danger: boolean = false;
  subject:any = [];
  submitted = false;
  error = {};

  constructor(public contactservice: ContactService, private toastr: ToastrManager , public route:ActivatedRoute, private formBuilder: FormBuilder,) { 
    this.addContactForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      subject: ['',Validators.required],
      phone: ['',Validators.required],
      message: ['']
     });
  }

  ngOnInit(): void {
    window.scroll(0,0);
  }


  onSubmit() {
    this.submitted = true;
    let obj = this.addContactForm.value;
    if (this.addContactForm.invalid){
      return false;
    }    
    return this.contactservice.addContact(obj).subscribe(response => {
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
    if(this.addContactForm.controls['email'].value == "" ){
      return "Email is required";
    } else if(this.addContactForm.controls['email'].status == "INVALID"){
      return "Invalid Email";
    } else {
      return this.addContactForm.controls['email'].hasError(errorName);
    }
    
  };
  

}
