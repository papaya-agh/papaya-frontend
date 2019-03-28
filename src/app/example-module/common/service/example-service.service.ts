import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExampleServiceService {
  
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employees');
  }
}
