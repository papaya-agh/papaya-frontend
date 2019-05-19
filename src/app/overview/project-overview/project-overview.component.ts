import { Component, OnInit } from '@angular/core';
import { ProjectDto } from '../../declarations/models/project-dto';
import { StoreService } from '../../p-common/store.service';


@Component({
  selector: 'app-example-component',
  templateUrl: './project-overview.component.html',
  styleUrls: [ './project-overview.component.css' ]
})
export class ProjectOverviewComponent implements OnInit {

  project: ProjectDto;

  constructor(private storeService: StoreService,
              ) {
  }

  ngOnInit() {
    this.project = this.storeService.getCurrentProject();
  }

}
