import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]
      ],
    category: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]
    ]
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
    );
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

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);
    console.log(field?.value);

    if(field?.hasError('required')) {
      return 'Field can not be empty.'
    }
    if(field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      console.log(requiredLength);
      return `Field need have minimun ${requiredLength} characteres.`;
    }
    if(field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Field can have maximum ${requiredLength} characteres.`;
    }
    return 'Invalid input.'
  }

}
