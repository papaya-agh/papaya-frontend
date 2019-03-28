import { Component, OnInit } from '@angular/core';
import { ExampleServiceService } from '../common/service/example-service.service';
import { Employee } from '../common/model/employee';


@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: [ './example-component.component.css' ]
})
export class ExampleComponentComponent implements OnInit {

  employees: Employee[];

  constructor(private exampleService: ExampleServiceService) {
  }

  ngOnInit() {
    this.exampleService.getEmployees().subscribe(response => this.employees = response);
  }

}
