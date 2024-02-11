import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  public courses: Course[] = [
    {_id: "1", name: "Angular", category: "frontend"}
  ];
  displayedColumns = ['name', 'category'];

  constructor() {
    // this.courses = [];
  }

}
