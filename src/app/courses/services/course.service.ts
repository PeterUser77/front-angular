import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly API = 'api/courses';
  private cache: Course[] = [];

  constructor(private httpClient: HttpClient) { }

  findAll(page = 0, element = 10) {
    return this.httpClient.get<CoursePage>(this.API, { params: { page, element } })
      .pipe(
        // delay(5000),
        first(),
        tap(data => (this.cache = data.courses))
      );
  }

  findById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  add(record: Partial<Course>) {
    if(record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record)
      .pipe(
        first()
      );
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record)
      .pipe(
        first()
      );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
