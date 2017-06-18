import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TagServiceService } from '../../services/tagServices/tag-service.service';


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  tagForm: FormGroup;
  postedTag: any;
  myTag: tag;

  constructor(private fb: FormBuilder, private tagService: TagServiceService) {}

  submitForm() {
    this.myTag = new tag(this.tagForm.value.tag,[]);

    this.tagService.AddTag(this.myTag).subscribe();
  }

  ngOnInit() {
    this.tagForm = this.fb.group({
      'tag': '',
    })
  }
}

class tag{
  name:String;
  recipes : Array<String>;
  constructor(name:String,recipes:Array<String>){
    this.name=name;
    this.recipes=recipes;
  }
}
