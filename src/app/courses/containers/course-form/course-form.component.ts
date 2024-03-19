import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CourseService } from '../../services/course.service';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.scss',
    standalone: true,
    imports: [
      MatCard,
      MatToolbar,
      MatCardContent,
      ReactiveFormsModule,
      MatFormField,
      MatInput,
      MatHint,
      NgIf,
      MatError,
      MatLabel,
      MatSelect,
      MatOption,
      MatMiniFabButton,
      MatIcon,
      NgFor,
      MatPrefix,
      MatIconButton,
      MatCardActions,
      MatButton]
})
export class CourseFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CourseService,
    private snack: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
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
        [ Validators.required ]
      ],
      lessons: this.formBuilder.array(
        this.getLessons(course),
        Validators.required
      )
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
      name: [
        lesson.name, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11)
        ]
      ]
    });

  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.formGroup.get('lessons')).controls;
  }

  onAddLesson() {
    const lessons = this.formGroup.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  onDeleteLesson(index: number) {
    const lessons = this.formGroup.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if(this.formGroup.valid) {
      this.courseService.add(this.formGroup.value).subscribe(
        succes => this.onSuccess(),
        error => this.onError()
      );
    } else {
      this.formUtils.validateAllFormsFields(
        this.formGroup
      );
    }
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

}
