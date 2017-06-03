import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.services' ;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] ,
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup ;
   constructor( private formBuilder: FormBuilder, private userService:UserService){
  
  }

  onSubmit(){
    let user = {
      name : this.signupForm.value.name, 
      img: this.signupForm.value.img ,
      password: this.signupForm.value.password,
      email: this.signupForm.value.email
    }
    console.log(user.name) ;
    let user2 = this.userService.isExist(user) ;
    

  }
  
 
  
  ngOnInit() {
      this.signupForm = this.formBuilder.group({
      name: ['',Validators.required], 
      email: ['',Validators.required],
      img: ['', Validators.required] ,
      password: ['', Validators.required]
    })
  }

}
