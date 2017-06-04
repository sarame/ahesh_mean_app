import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courseServices/courses.service';
import { course } from '../../../poco/course';
import { section } from '../../../poco/section';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  // instantiate courses to an empty array
  courseid: string;
  course: course = new course();
  sections:any=[];
  constructor(private actRouter: ActivatedRoute, private coursesService: CoursesService,private router:Router
  ) { }
 changeRout(){
this.router.navigate(["/courses/course/",this.courseid])
}
  ngOnInit() {
    // Retrieve courses from the API
    this.courseid = this.actRouter.snapshot.params["id"];
    this.coursesService.getById(this.courseid).subscribe(course => {
      this.course = course;
      this.sections=course.sections;


      console.log(course);
    });


  }

}
