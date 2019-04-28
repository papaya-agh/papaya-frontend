import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [ './new-project.component.css' ]
})
export class NewProjectComponent implements OnInit {

  id: number;
  projectName: string;
  description: string;
  coefficient = 1.55;
  error: string;

  constructor(private router: Router,
              private projectService: ProjectsService) {
  }

  ngOnInit() {
  }

  handleClick() {
    if (this.projectName == null || this.description == null) {
      this.error = 'Podaj nazwę i opis projektu.';
      return;
    } else {
      this.error = '';
    }

    this.projectService.addProject(
      {
        id: null,
        name: this.projectName,
        description: this.description,
        initialCoefficient: this.coefficient,
      }
    ).subscribe(response => this.id = response.id);

    this.router.navigateByUrl('/projects');
  }
}
