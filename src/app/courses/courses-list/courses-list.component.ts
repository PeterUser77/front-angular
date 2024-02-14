import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  displayedColumns = ['_id', 'name', 'category', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

}
