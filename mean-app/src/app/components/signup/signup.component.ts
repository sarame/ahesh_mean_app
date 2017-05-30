import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupFrom = new FormGroup ({
    name: new FormControl(),
    email: new FormControl(), 
    password: new FormControl(),
    img: new  FormControl(),
    bio: new FormControl()
  });
  constructor() { }

  ngOnInit() {
  }

}
