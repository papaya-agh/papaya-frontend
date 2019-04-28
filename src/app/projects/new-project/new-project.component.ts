import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { ProjectDto } from '../../declarations/models/project-dto';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [ './new-project.component.css' ]
})
export class NewProjectComponent implements OnInit {

  project: ProjectDto;
  errorMessage = 'Podaj nazwę i opis projektu.';
  showError: boolean;

  constructor(private router: Router,
              private projectsService: ProjectsService) {
    this.project = {
      id: undefined,
      name: '',
      description: '',
      initialCoefficient: 1.55
    };
  }

  ngOnInit() {
  }

  handleClick() {
    if (!this.project.name || !this.project.description) {
      this.showError = true;
      return;
    } else {
      this.showError = false;
    }

    this.projectsService.addProject(this.project)
      .subscribe(response => {
        this.project = response;
        this.router.navigateByUrl('/projects');
      });
  }
}
