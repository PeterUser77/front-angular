import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver {
  constructor(private service: CourseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if (route.params && route.params['id']) {
      return this.service.findById(route.params['id']);
    }

    return of({ _id: '', name: '', category: '', lessons: [] });
  }
}
