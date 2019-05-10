import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectDto } from '../../declarations/models/project-dto';
import { StoreService } from '../../p-common/store.service';


@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: [ './example-component.component.css' ]
})
export class ExampleComponentComponent implements OnInit {

  project: ProjectDto;

  constructor(private storeService: StoreService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.project = this.storeService.getCurrentProject();
  }

}
