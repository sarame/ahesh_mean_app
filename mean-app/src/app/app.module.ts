import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';

// Imports commented out for brevity
import { RouterModule } from '@angular/router';


// Imports commented out for brevity

import { PostsService } from './services/posts.service';
import { HomeService } from './services/homeServices/home.service';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { MostRatedComponent } from './components/most-rated/most-rated.component';
import { LearningComponent } from './components/learning/learning.component';
import { TagsComponent } from './components/tags/tags.component';



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
    TagsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService,HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }


