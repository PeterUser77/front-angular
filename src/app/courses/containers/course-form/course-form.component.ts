import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  formGroup = this.formBuilder.group({
    _id: '',
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CourseService,
    private snack: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.formGroup.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
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
      'Course saved with success.',
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
