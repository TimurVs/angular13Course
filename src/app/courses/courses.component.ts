import { Component, OnInit } from '@angular/core';
import {Course} from "../common/models/course";
import {CoursesService} from "../common/servises/courses.service";

const emptyCourse: Course = {
  id: '',
  title: '',
  description: '',
  percentComplete: 0,
  favorite: false,
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [`./courses.component.scss`]
})

export class CoursesComponent implements OnInit {

  courses = [];

  selectedCourse = emptyCourse;
  originalTitle = '';
  experiments: any;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.fetchAllCourses()
  }

  fetchAllCourses(){
    this.coursesService.all()
      .subscribe((result : any) => this.courses = result)
  }

  selectCourse(course){
    this.selectedCourse = {...course};
    this.originalTitle = course.title
  }

  deleteCourse(courseId) {
    console.log('clicked', courseId)
  }

  resetCourse () {
    this.selectCourse({...emptyCourse})
  }

  saveCourse (course) {
    if(course.id) {
      this.updateCourse(course)
    } else {
      this.createCourse(course)
    }
  }

  createCourse(course){
    this.coursesService.create(course)
      .subscribe(result => this.fetchAllCourses())
  }

  updateCourse(course) {
    this.coursesService.update(course)
      .subscribe(result => this.fetchAllCourses())
  }
}
