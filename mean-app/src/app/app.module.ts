import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';

// Imports commented out for brevity
import { RouterModule } from '@angular/router';

// import services  

import { UserService } from './services/user.services';
import { RecipeService } from './services/recipeServices/recipe.service';
// import { TagService } from './services/tagServices/tag.service';

// Imports commented out for brevity

//services
import { PostsService } from './services/posts.service';
import { CoursesService } from './services/courseServices/courses.service';

import { StarDirective } from './directives/starDirective/star.directive';
import { ProfileService } from './services/profileServices/profile.service';
import { HomeService } from './services/homeServices/home.service';
import { LoadScriptService } from './services/scriptServices/load-script.service';
//Components
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { CircularComponent } from './components/circularProgressBarComponent/circular.component';
import { Circular2Component } from './components/circularProgressBarComponent/circular2.component';
import { MostRatedComponent } from './components/most-rated/most-rated.component';
import { LearningComponent } from './components/learning/learning.component';
import { TagsComponent } from './components/tags/tags.component';
import { SignupComponent } from './components/signup/signup.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { FacebookSigninComponent } from './components/facebook-sign-in/facebook-signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FilterComponent } from './components/filter/filter.component';
import { Filter2Component } from './components/filter2/filter2.component';
import { RecipeContentComponent } from './components/recipeContent/recipeContent.component';
import { UserRecipeContentComponent } from './components/userRecipeContent/userRecipeContent.component';
import { RecipesViewComponent } from './components/recipesView/recipesView.component';
import { RecipeContainerComponent } from './components/recipeContainer/recipeContainer.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { PrivateProfileComponent } from './components/private-profile/private-profile.component'
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailsComponent } from './components/courseDetails/courseDetails.component';
import { ShowDivDirective } from './directives/recipeShow/show-div.directive';
import { HideDivDirective } from './directives/recipeHide/hide-div.directive';
import { ImageComponent } from './components/image/image.component';



import { ImageUploadModule } from 'ng2-imageupload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';

// Define the routes
const ROUTES = [

  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'index',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile/:tabValue',
    component: ProfileComponent
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/:id',
    component: CourseComponent
  },
  {
    path: 'courses/course/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent

  },
  {
    path: 'image',
    component: ImageComponent

  },
  {
    path: 'map',
    component: MapComponent

  },
  {
    path: 'recipes/filter/:type',
    component: RecipeContainerComponent
  },
  {
    path: 'privateProfile',
    component: PrivateProfileComponent
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    Filter2Component,
    AppComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    UserRecipeContentComponent,
    PrivateProfileComponent,
    MostRatedComponent,
    LearningComponent,
    TagsComponent,
    SignupComponent,
    GoogleSignInComponent,
    LoginComponent,
    ProfileComponent,
    StarDirective,
    CoursesComponent,
    CourseComponent,
    CourseDetailsComponent,
    ShowDivDirective,
    HideDivDirective,
    AboutUsComponent,
    FilterComponent,
    RecipesViewComponent,
    RecipeContentComponent,
    RecipeContainerComponent,
    ImageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    ImageUploadModule,
    ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAarYMSdp3eWTWy9jNDcTygcEVoA0MG8E'
    }),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    ReactiveFormsModule
  ],
  providers: [PostsService, UserService, ProfileService, HomeService, CoursesService, LoadScriptService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }


