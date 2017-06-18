import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courseServices/courses.service';
import { course } from '../../../poco/course';
import { section } from '../../../poco/section';
import { ActivatedRoute, Router } from '@angular/router';
import{ProfileService} from '../../services/profileServices/profile.service'


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  // instantiate courses to an empty array
  courseid: string;
  @Input() course: any;
  @Input() currentUser:any;
  sections: any = [];
  constructor(private userServices:ProfileService,private actRouter: ActivatedRoute, private coursesService: CoursesService, private router: Router
  ) { }
  changeRout() {
    if(this.currentUser.enrolledCourse.findIndex(x=>this.course._id===x._id)<0){
      console.log("vist course");
      this.currentUser.enrolledCourse.push(this.course);
      this.userServices.UpdateById(this.currentUser._id,this.currentUser);
    }
    this.router.navigate(["/courses/course/", this.course._id]);
  }
  ngOnInit() {
  }

}
