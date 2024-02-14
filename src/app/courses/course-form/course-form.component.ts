import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from './../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private snack: MatSnackBar,
    private location: Location
    // public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
        name: [null],
        category: [null]
    });
  }

  onAdd() {
    this.courseService.add(this.formGroup.value).subscribe(
      succes => this.onSuccess(),
      error => this.onError()
      // error => {
      //   this.onError('Could not add course.')
      // }
    )
  }

  onSuccess() {
    this.snack.open(
      'Course add with success.',
      '',
      { duration: 5000 }
    );
    this.location.back();
  }

  onError() {
    this.snack.open(
      'Could not add course.',
      '',
      { duration: 5000 }
    );
    // this.dialog.open(ErrorDialogComponent, {
    //   data: errorMsg
    // })
  }

  onCancel() {
    this.location.back();
  }

}
