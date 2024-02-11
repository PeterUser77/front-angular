import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return [
      {_id: "1", name: "Angular", category: "frontend"}
    ];
  }


}
