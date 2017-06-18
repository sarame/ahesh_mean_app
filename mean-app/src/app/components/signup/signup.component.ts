import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService, Iuser } from '../../services/user.services';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router' ;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
 
  isAUser: any;

  constructor(private formBuilder: FormBuilder,
   private userService: UserService,
   private localStorageService: LocalStorageService,
   private router: Router) {

  }
   isExist(){
     console.log("hi inside change : 0") ;
        let user = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        img: this.signupForm.value.img,
        password: this.signupForm.value.password
      }
      this.checkUserIsExist(user);
    }
  ussssr: any = {};
  myuser: Iuser  = null;
  
  onSubmit() {
    console.log("inside submit function");
    let user;
    if (this.signupForm.valid && this.myuser===null ) {
      console.log("inside IF")
      
      user = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        img: this.signupForm.value.img,
        password: this.signupForm.value.password
      }
      this.userService.signup(user).subscribe(res => {
        console.log("the res " + res.name)
        this.localStorageService.set('currentUser',res);
        this.router.navigate(['/index']) ;

      });
    } else {
      alert("there is someting wrong please sign up with an hour");
    }
  }
  checkUserIsExist(user):any {
    
      let result :boolean =false; 
    let x = this.userService.isExist(user);
    console.log(x) ;
        x.subscribe(t => {
        this.myuser = t ;      
      });
      result = true; 
    return result;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      img: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
