import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage' ;
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';

import {SelectModule} from 'ng2-select'; //henaa
import { ImageUploadModule } from 'ng2-imageupload'; //hena
import { FocusModule } from 'angular2-focus'

// Imports commented out for brevity
import { RouterModule } from '@angular/router';

// import services  

import { UserService } from './services/user.services';
// Imports commented out for brevity
// basma 
import { RecipeAddService } from './services/recipeaddServices/recipe-add.service'; //meeeeeeeeee
import { IngredientService } from './services/IngredientServices/ingredient.service'; //meeeeeeeee
import { TagServiceService } from './services/tagServices/tag-service.service'; //meeeeeeeee
import { UnitTypeService } from './services/unitServices/unit-type.service'; //meeeeeeeee
import {  ContactUsService } from './services/contactusServices/contact-us.service'

import { PostsService } from './services/posts.service';
import { LoginComponent } from './components/login/login.component';
import { HomeService } from './services/homeServices/home.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { MostRatedComponent } from './components/most-rated/most-rated.component';
import { LearningComponent } from './components/learning/learning.component';
import { TagsComponent } from './components/tags/tags.component';
import { SignupComponent } from './components/signup/signup.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { FacebookSigninComponent } from './components/facebook-sign-in/facebook-signin.component' ;
import { ContactusComponent } from './components/contactus/contactus.component';
import { PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component' ;
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { AddTagComponent } from './components/add-tag/add-tag.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';



// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
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
  { path: 'add-recipe',
     component: AddRecipeComponent },   
  { path: 'add-ingredient',
   component: AddIngredientComponent }, 
  { path: 'add-tag',
   component: AddTagComponent },                                             

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  }
  ,{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    MostRatedComponent,
    LearningComponent,
    TagsComponent,
    SignupComponent,
    GoogleSignInComponent,
    LoginComponent,
    PageNotFoundComponent,
    EditRecipeComponent,
    AddIngredientComponent,
    AddTagComponent,
    AddRecipeComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SelectModule,
    ImageUploadModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
  ReactiveFormsModule,
  FocusModule
  ],
  providers: [PostsService,
   UserService,
   HomeService,
   RecipeAddService,
   IngredientService,
   TagServiceService,
   UnitTypeService,
   ContactUsService],
   
  bootstrap: [AppComponent]
})
export class AppModule { }


