import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courseServices/courses.service';
import { ProfileService } from '../../services/profileServices/profile.service';
import { course } from '../../../poco/course';
import { section } from '../../../poco/section';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-courseDetails',
  templateUrl: './courseDetails.component.html',
  styleUrls: ['./courseDetails.component.css']
})
export class CourseDetailsComponent implements OnInit {

  // instantiate courses to an empty array
  userId: string = "59175dff871f492068d93127";
  user: any;
  courseid: string;
  course: course = new course();
  isActive: boolean[];
  constructor(private actRouter: ActivatedRoute, private coursesService: CoursesService, private userService: ProfileService) { }
  changeActive(index) {
    console.log(`indea is : ${index}`);
    if (this.isActive[index] === false) {
      this.isActive.fill(false)
      this.isActive[index] = true;
    }

  }
  ngOnInit() {
    // Retrieve courses from the API
    this.courseid = this.actRouter.snapshot.params["id"];
    this.coursesService.getById(this.courseid).subscribe(course => {
      this.course = course;
      this.isActive = new Array(course.sections.length).fill(false);
      console.log(this.isActive);
      this.isActive[0] = true;
    });
    this.userService.GetbyId(this.userId).subscribe(_user => this.user = _user);


  }

}
