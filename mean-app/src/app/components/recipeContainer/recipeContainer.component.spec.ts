import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeContainerComponent } from './recipeContainer.component';

describe('CoursesComponent', () => {
  let component: RecipeContainerComponent;
  let fixture: ComponentFixture<RecipeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
