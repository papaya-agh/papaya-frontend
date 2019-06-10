import { Pipe, PipeTransform } from '@angular/core';
import { ProjectMemberDto } from '../declarations/models/project-member-dto';
import { UserAvailabilityDto } from '../declarations/models/user-availability-dto';

@Pipe({
  name: 'workers'
})
export class WorkersPipe implements PipeTransform {

  transform(userAvailabilities: UserAvailabilityDto[], projectMembersById?: {}): Worker[] {
    return userAvailabilities.map(availability =>
      availability.availability ?
        {
          timeAvailable: this.formatNumber(availability.availability.timeAvailable),
          effectiveTimeAvailable: this.formatNumber(availability.availability.effectiveTimeAvailable),
          timeRemaining: this.formatNumber(availability.availability.timeRemaining),
          notes: availability.availability.notes,
          name: this.createFullName(projectMembersById[availability.userId]),
        } :
        {
          timeAvailable: '',
          effectiveTimeAvailable: '',
          timeRemaining: '',
          notes: '',
          name: this.createFullName(projectMembersById[availability.userId])
        }
    );
  }

  private formatNumber(num: number): string {
    return (Math.floor(num / 60) + Math.round((num % 60) / 60 * 100) / 100).toString();
  }

  private createFullName(user: ProjectMemberDto): string {
    return user.user.firstName + ' ' + user.user.lastName;
  }
}


interface Worker {
  name: string;
  timeAvailable: string;
  effectiveTimeAvailable: string;
  timeRemaining: string;
  notes?: string;
}
