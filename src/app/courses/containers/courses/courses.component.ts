import { Component, ViewChild } from '@angular/core';
import { Course } from '../../model/course';
import { CourseService } from '../../services/course.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    standalone: true,
    imports: [MatCard, NgIf, MatToolbar, MatMiniFabButton, MatIcon, CoursesListComponent, MatPaginator, MatProgressSpinner, AsyncPipe]
})
export class CoursesComponent {

  courses$: Observable<CoursePage> | null = null;

  page = 0;
  element = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private coursesService: CourseService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(
      ['edit', course._id],
      {relativeTo: this.route}
    );
  }

  onDelete(course: Course) {

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      { data: 'Are you sure want delete this course?' }
    )

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        if(result) {
          this.coursesService
            .delete(course._id)
            .subscribe(
              () => {
                this.snack.open(
                  'Course deleted with success.',
                  '',
                  { duration: 5000 }
                );
                this.refresh();
              },
              () => {
                this.onError('Could not delete course');
              }
          );
        }
      }
    )
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.courses$ = this.coursesService
      .findAll(
        pageEvent.pageIndex,
        pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.page = pageEvent.pageIndex;
          this.element = pageEvent.pageSize;
        }),
        catchError(() => {
          this.onError('Error loading courses.');
          return of({ courses: [], totalElements: 0, totalPages: 0} as CoursePage);
        })
      );
  }


}
