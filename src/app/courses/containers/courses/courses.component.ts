import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { CourseService } from '../../services/course.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  public courses$: Observable<Course[]> | null = null;

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

  private refresh() {
    this.courses$ = this.coursesService.findAll().pipe(
      catchError(error => {
        this.onError('Could not load courses.')
        return of([])
      })
    );
  }


}
