import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timetillnow',
})
export class TimeTillNowPipe implements PipeTransform {
  constructor() {}

  transform(value: any, ...args: any[]) {
    console.log('from time till now pipe...', value.getTime);
    let time = new Date().getTime() - value.getTime();
    return time;
  }
}
