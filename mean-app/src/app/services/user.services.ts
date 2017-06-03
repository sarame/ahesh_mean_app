import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs'
import { User } from '../../poco/user';

@Injectable()
export class UserService {
    // user: User ;
    API: string = '';
    users: any[] ;
    currentUser: any = {}
  constructor(private http: Http ,
   private localStorageService: LocalStorageService){
   }

  // Get all posts from the API
  
    signup(user:any) {
    let bodyString = JSON.stringify(user); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
  this.localStorageService.add('currentUser',user);  
        return this.http.post('/api/user', user, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any      
  }
  // register by the website 

  register(usser:any) {
      let user = {
      name : usser.name, 
      img: usser.img ,
      password: usser.password,
      email: usser.email
    }
    
  } 
  isExist(user:any) : any {
      return this.http.get(`/api/user/g/`+ user.email)
      .map(res => res.json())
      .subscribe(user => {
      this.currentUser = user; 
      console.log("gowa el service" +this.currentUser);
      console.log("da el currentuser gowa el local " + this.localStorageService.get('currentUser'));
      if(this.localStorageService.get('currentUser')===''){
          this.localStorageService.add('currentUser' ,this.currentUser.name)
      }
    });
  }

  login(user:any): any{
        return this.http.get(`/api/user/g/`+ user.email)
      .map(res => res.json())
      .subscribe(user => {
      this.currentUser = user; 
      console.log("gowa el service" +this.currentUser);
      console.log("da el currentuser gowa el local " + this.localStorageService.get('currentUser'));
      if(this.localStorageService.get('currentUser')===''){
          this.localStorageService.add('currentUser' ,this.currentUser.name)
      }
    });
  }
      getAllUser(){
          return this.http.get(`/api/user`)
          .map(res => res.json())
          .subscribe( users => {
              this.users = users ;
              console.log(users) ;
          });


      }
  
  }

