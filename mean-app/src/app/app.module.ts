import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage' ;
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';

// Imports commented out for brevity
import { RouterModule } from '@angular/router';

// import services  

import { UserService } from './services/user.services';
// Imports commented out for brevity

import { PostsService } from './services/posts.service';
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
  }
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
  ReactiveFormsModule
  ],
  providers: [PostsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }


