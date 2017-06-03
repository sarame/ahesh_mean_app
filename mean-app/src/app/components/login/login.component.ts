import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'posts.component.html',
  
})
export class LoginComponent implements OnInit {

// instantiate posts to an empty array
  user: any ;

  constructor(private userService: UserService) { }


  ngOnInit() {
    // Retrieve posts from the API
   
  }

}
