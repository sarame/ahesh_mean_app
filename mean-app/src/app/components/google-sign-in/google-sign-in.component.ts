import { Component, OnInit ,  ElementRef , AfterViewInit, } from '@angular/core';
import { User } from './../../../poco/user' ;
import { UserService } from '../../services/user.services'
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: `<button type="button" class="btn btn-google btn-lg"><i class="fa fa-google-plus" 
  aria-hidden="true"></i> Sign Up with Google</button>`,
  providers: [UserService]
})
export class GoogleSignInComponent implements  AfterViewInit{

  constructor(private element: ElementRef ,
  private userservice: UserService) {
    console.log('ElementRef: ', this.element);

  }


   private clientId:string = '713677849239-3tapd9bdmcm377rkgj6lk513ash9ja96.apps.googleusercontent.com';
   private clientsecret: 'ngQGV5t-A7pweLXV7ek6yLqM';
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    // 'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  user: User;
  public attachSignin(element) {
    let that = this;
    
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let userx : any = {};
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
       
       userx = {
         name: profile.getName(),
         img: profile.getImageUrl(),
         email: profile.getEmail(),
         bio:  profile.getId(),
         authonticationId: googleUser.getAuthResponse().id_token  
       }
       console.log(userx.name) ;
       that.assignData(userx) ;

        
        
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
      //sconsole.log("hhhhhh " +that.user.name) ;
  }

  assignData(u:any){
    console.log("try function " + u.name) ;
     this.userservice.signup(u) ;
    
  }
  //  ngOnInit(){
  //   this.googleInit(); 
  //  }
    ngAfterViewInit() {
    this.googleInit();
    console.log("this is usssssr   " + this.user) ;
  
        
    
  }

   signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

}
