import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { StoreService } from '../../p-common/store.service';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ProjectMemberDto } from '../../declarations/models/project-member-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: [ './project-members.component.css' ]
})
export class ProjectMembersComponent implements OnInit {

  membersSnapshot: ProjectMemberDto[] = [];
  members: ProjectMemberDto[] = [];
  editMode = false;
  addMemberForm: FormGroup;
  submitted = false;
  loading = false;

  memberTypeToNameMapping = {
    ADMIN: 'Administrator',
    MEMBER: 'Członek zespołu'
  };

  memberTypes: SelectItem[] = [
    { label: this.memberTypeToNameMapping.MEMBER, value: 'MEMBER' },
    { label: this.memberTypeToNameMapping.ADMIN, value: 'ADMIN' },
  ];

  constructor(private projectsService: ProjectsService,
              private store: StoreService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.addMemberForm = this.formBuilder.group({
      memberEmail: [ '', [ Validators.required, Validators.email ] ],
    });

    if (!this.store.currentProject) {
      this.router.navigate([ '/' ]);
      return;
    }

    this.projectsService.getMembers(this.store.currentProject.id)
      .subscribe(result => this.members = result);
  }

  get f() {
    return this.addMemberForm.controls;
  }

  onAdd() {
    this.submitted = true;

    if (this.addMemberForm.invalid) {
      if (this.f.memberEmail.errors.email) {
        this.messageService.add({
          severity: 'error',
          summary: 'Niepoprawny adres',
          detail: `'${this.f.memberEmail.value}' nie jest poprawnym adresem email`
        });
      }
      return;
    }

    this.loading = true;
    this.projectsService.addMember({ email: this.f.memberEmail.value }, this.store.currentProject.id)
      .subscribe(response => {
        this.members.push(response);
        this.submitted = false;
        this.addMemberForm.reset();
        this.loading = false;
      });
  }

  onEdit() {
    this.membersSnapshot = JSON.parse(JSON.stringify(this.members));
    this.editMode = true;
  }

  onSave() {
    for (const i in this.members) {
      if (this.members[i].role !== this.membersSnapshot[i].role) {
        this.projectsService.setMemberRole(this.members[i], this.members[i].user.id , this.store.currentProject.id).subscribe();
      }
    }

    this.editMode = false;
  }

  onCancel() {
    this.members = this.membersSnapshot;
    this.membersSnapshot = [];
    this.editMode = false;

  }

  onRemove(member: ProjectMemberDto) {
    this.projectsService.removeMember(member.user.id, this.store.currentProject.id)
      .subscribe(() => this.members = this.members.filter(m => m.user.id !== member.user.id ));
  }
}
