import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courseServices/courses.service';
import { ProfileService } from '../../services/profileServices/profile.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // instantiate courses to an empty array
  courses: any = [];
  userId:string="59175dff871f492068d93127";
  user:any;
  constructor(private coursesService: CoursesService,private userService:ProfileService) { }

  ngOnInit() {
    // Retrieve courses from the API
    this.coursesService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses);
    });
    this.userService.GetbyId(this.userId).subscribe(x=>{
      this.user=x;
      console.log(this.user);
    });
  }

}
