import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CourseService,
    private snack: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    const course: Course = this.route.snapshot.data['course'];
    this.formGroup = this.formBuilder.group({
      _id: [course._id],
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      category: [
        course.category,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ]
      ],
      lessons: this.formBuilder.array(this.getLessons(course))
    });

  }

  private getLessons(
    course: Course
  ) {

    const lessons = [];

    if(course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(
    lesson: Lesson = {
      id: '',
      name: '',
      youtubeUrl: ''}
  ) {

    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
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
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

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
