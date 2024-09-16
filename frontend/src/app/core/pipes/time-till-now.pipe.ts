import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timetillnow',
})
export class TimeTillNowPipe implements PipeTransform {
  constructor() {}

  transform(value: any, ...args: any[]) {
    // console.log('from time till now pipe...', value);
    value = String(value);
    // console.log('args', args);

    const result = this.getResult(value);

    // console.log('difference is', difference);
    // let time = new Date().getTime() - value.getTime();
    return result + ' ago';
  }

  getResult(from: any, till: any = Date.now()): string {
    var defaultValue: any = new Date('' + from).toLocaleDateString();

    let date1Seconds: any = new Date('' + from).getUTCSeconds();
    let date1Minutes: any = new Date('' + from).getUTCMinutes();
    let date1Hours: any = new Date('' + from).getUTCHours();
    let date1Date = new Date('' + from).getUTCDate();
    let date1Months = new Date('' + from).getUTCMonth();
    let date1Years = new Date('' + from).getUTCFullYear();

    let date2Seconds: any = new Date(till).getUTCSeconds();
    let date2Minutes: any = new Date(till).getUTCMinutes();
    let date2Hours: any = new Date(till).getUTCHours();
    let date2Date = new Date(till).getUTCDate();
    let date2Months = new Date(till).getUTCMonth();
    let date2Years = new Date(till).getUTCFullYear();

    var differenceSeconds = Math.abs(date1Seconds - date2Seconds);
    var differenceHours = Math.abs(date1Hours - date2Hours);
    var differenceMinutes = Math.abs(date1Minutes - date2Minutes);
    var differenceDate = Math.abs(date1Date - date2Date);
    var differenceMonths = Math.abs(date1Months - date2Months);
    var differenceYears = Math.abs(date1Years - date2Years);

    if (
      differenceSeconds < 60 &&
      differenceMinutes <= 0 &&
      differenceHours <= 0 &&
      differenceDate <= 0 &&
      differenceMonths <= 0
    ) {
      return differenceSeconds < 9
        ? '0' + differenceSeconds + ' sec'
        : differenceSeconds + ' sec';
    } else if (
      differenceMinutes < 60 &&
      differenceHours <= 0 &&
      differenceDate <= 0
    ) {
      return differenceMinutes + ' min, ' + differenceSeconds + ' sec.';
    } else if (
      differenceHours <= 24 &&
      differenceDate <= 0 &&
      differenceMonths <= 0
    ) {
      return differenceHours <= 1
        ? differenceHours + 'hour'
        : differenceHours + ' hours';
    } else if (differenceDate <= 31 && differenceMonths <= 0) {
      return differenceDate <= 1
        ? differenceDate + ' day'
        : differenceDate + ' days';
    } else if (differenceMonths <= 12 && differenceYears <= 0) {
      return differenceMonths <= 1
        ? differenceMonths + ' month'
        : differenceMonths + ' months';
    } else {
      return differenceYears <= 1
        ? differenceYears + 'year'
        : differenceYears + 'years';
    }
  }
}
