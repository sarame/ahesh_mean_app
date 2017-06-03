import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginOptions,LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'facebook-signin',
  template:`
    <button type="button" class="btn btn-facebook btn-lg">
    <i class="fa fa-facebook"></i> Sign Up with Facebook</button>
` 
})
export class FacebookSigninComponent  {

  constructor( private fb: FacebookService) { 
   const params: InitParams = {
      appId      : '448646758841571',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    }
     fb.init(params);
  }
  






}
