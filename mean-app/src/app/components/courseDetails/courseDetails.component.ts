import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courseServices/courses.service';
import { course } from '../../../poco/course';
import { section } from '../../../poco/section';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './courseDetails.component.html',
  styleUrls: ['./courseDetails.component.css']
})
export class CourseDetailsComponent implements OnInit {

  // instantiate courses to an empty array
  courseid: string;
  course: course = new course();
  isActive:boolean[];
  constructor(private actRouter: ActivatedRoute, private coursesService: CoursesService) { }
changeActive(index){
  console.log(`indea is : ${index}`);
  if(this.isActive[index]===false){
    this.isActive.fill(false)
    this.isActive[index]=true;
  }
  
}
  ngOnInit() {
    // Retrieve courses from the API
    this.courseid = this.actRouter.snapshot.params["id"];
    this.coursesService.getById(this.courseid).subscribe(course => {
    this.course = course;
    this.isActive= new Array(course.sections.length).fill(false);
    console.log(this.isActive);
    this.isActive[0]=true;
      });


  }

}
