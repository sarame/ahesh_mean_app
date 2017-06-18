import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../services/contactusServices/contact-us.service'; //meeeeeeeee
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactusForm: FormGroup;
  private contactusData: any;
  private isFocused: Array<boolean> = [false, false, false];
  // private controls : Array<string> = ["name","email","message"];
  private success : boolean = false;


  constructor(private fb: FormBuilder, private contactus: ContactUsService) { }

  ngOnInit() {
    this.contactusForm = this.fb.group({
      "name": ["", Validators.required],
      "email": ["", Validators.email],
      "message": ["", Validators.required]
    })
  }

  submitForm() {
    if (this.contactusForm.valid) {
      this.contactusData = new conatctus(this.contactusForm.value.name,
        this.contactusForm.value.email, this.contactusForm.value.message);

      this.contactus.AddContactUs(this.contactusData).subscribe(data => {
        this.success = true;
        this.contactusForm.reset();
      });
    }
    else {
      alert("You didn't enter all fields");
      var i = 0;
      Object.keys(this.contactusForm.controls).forEach(control=>{
        if (this.contactusForm.controls[control].invalid) {
          this.isFocused[i] = true;
          i++;
        }
      })
    }
  }
}
class conatctus {
  name: string;
  email: string;
  message: string;
  constructor(name: string, email: string, message: string) {
    this.name = name;
    this.email = email;
    this.message = message;
  }
}
