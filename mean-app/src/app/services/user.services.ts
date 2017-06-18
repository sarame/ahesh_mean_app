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
    currentUser: any = {} ;
    theuser: Iuser;
  constructor(private http: Http ,
   private localStorageService: LocalStorageService){
   }

 
    signup(user:any) {
    let bodyString = JSON.stringify(user); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
 //   this.localStorageService.add('currentUser',user);  
        return this.http.post('/api/user', bodyString, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any      
  }
 

  register(usser:any) {
      let user = {
      name : usser.name, 
      img: usser.img ,
      password: usser.password,
      email: usser.email
    }
    
  }

  isExist(user:any) :Observable<Iuser> {
      return this.http.get(`/api/user/g/`+ user.email)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any   
      
    
  }

  login(user:any){
      console.log("the user =>  " +  user.password); 
      this.isExist(user).subscribe(res => {
          console.log("inside is exist user " , res ) ;
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

  export interface Iuser{
      name: string,
      email: string,
      password:string,
      bio,string ;
      img:string,
      
  }

