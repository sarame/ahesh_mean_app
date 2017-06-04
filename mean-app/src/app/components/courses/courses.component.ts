import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courseServices/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // instantiate courses to an empty array
  courses: any = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    // Retrieve courses from the API
    this.coursesService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses);
    });
  }

}
