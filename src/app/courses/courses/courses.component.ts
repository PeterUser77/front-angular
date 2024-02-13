import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  public courses$: Observable<Course[]>;
  displayedColumns = ['_id', 'name', 'category'];

  constructor(
    private coursesService: CourseService,
    public dialog: MatDialog
  ) {

    this.courses$ = this.coursesService.findAll().pipe(
      catchError(error => {
        this.onError('Could not load courses.')
        return of([])
      })
    );

  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

}
