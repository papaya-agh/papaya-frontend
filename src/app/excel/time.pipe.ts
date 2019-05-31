import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeFormater'
})
export class TimeFormaterPipe implements PipeTransform {
  transform(value: number): string {
    return (Math.floor(value / 60) + Math.round((value % 60) / 60 * 100) / 100).toString();;
  }
}