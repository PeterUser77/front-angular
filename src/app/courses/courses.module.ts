import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        CoursesRoutingModule,
        AppMaterialModule,
        SharedModule,
        ReactiveFormsModule,
        CoursesComponent,
        CourseFormComponent,
        CoursesListComponent,
        ConfirmationDialogComponent
    ]
})
export class CoursesModule { }
