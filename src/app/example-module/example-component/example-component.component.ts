import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: [ './example-component.component.css' ]
})
export class ExampleComponentComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

}
