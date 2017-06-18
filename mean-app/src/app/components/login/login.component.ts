import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService , Iuser } from '../../services/user.services' ;
import { Router } from '@angular/router' ;
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  user: any ;
  exit: boolean = false; 

  constructor(private userService: UserService,
  private formBuilder: FormBuilder, 
  private router :Router,
  private localStorageService: LocalStorageService) { }

  submitForm(){

    if (this.loginForm.value.email ==="" || this.loginForm.value.password===""){
      alert("Please enter email and password") ;
      this.loginForm.reset ;
      return ;
    }
    let loginUser = {
      email : this.loginForm.value.email, 
      password: this.loginForm.value.password
    }

     this.user = this.userService.isExist(loginUser)
     .subscribe(res => { 
       
       if (res === null || typeof res === undefined){
       // redirect sign up
       alert("you are not a regsitered user, please login");
       
       this.router.navigate(['/signup']);
       
     } else {
       console.log("logged in user" , res) ;
       this.localStorageService.set("currenUser" , res) ;
       console.log("inside local storage => " ,  this.localStorageService.get("currentUser")) ;
       this.router.navigate(['/index']) ;
     }
     });
     

    console.log(loginUser);
  }

  isExist(){
    let loginUser = {
      email : this.loginForm.value.email, 
    }
    this.userService.isExist(loginUser)
    .subscribe(res => { 
      if (typeof res!== undefined  || res !== null){
         this.exit = false ;
      } else  {
      this.exit = true ;
      }
    });

  }
  ngOnInit() {
    // Retrieve posts from the API
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password:['',Validators.required]
    });
  }

}
