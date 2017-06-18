import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeContentComponent } from './userRecipeContent.component';

describe('CoursesComponent', () => {
  let component: UserRecipeContentComponent;
  let fixture: ComponentFixture<UserRecipeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRecipeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecipeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
