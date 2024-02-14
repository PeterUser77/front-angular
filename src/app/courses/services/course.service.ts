import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        delay(5000),
        first()
      );
  }

  add(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record)
      .pipe(
        first()
      );
  }

}
