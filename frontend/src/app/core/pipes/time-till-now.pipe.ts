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
    let date1Seconds: any = new Date('' + value).getUTCSeconds();
    let date1Minutes: any = new Date('' + value).getUTCMinutes();
    let date1Hours: any = new Date('' + value).getUTCHours();
    let date1Day = new Date('' + value).getUTCDay();
    let date1Months = new Date('' + value).getUTCMonth();
    let date1Years = new Date('' + value).getUTCFullYear();
    // console.log('full year ', date1Years);

    let date2Seconds: any = new Date(Date.now()).getUTCSeconds();
    let date2Minutes: any = new Date(Date.now()).getUTCMinutes();
    let date2Hours: any = new Date(Date.now()).getUTCHours();
    let date2Day = new Date(Date.now()).getUTCDay();
    let date2Months = new Date(Date.now()).getUTCMonth();
    let date2Years = new Date(Date.now()).getUTCFullYear();

    var differenceSeconds = date1Seconds - date2Seconds;
    var differenceHours = date1Hours - date2Hours;
    var differenceMinutes = date1Minutes - date2Minutes;
    var differenceDays = date1Day - date2Day;
    var differenceMonths = date1Months - date2Months;
    var differenceYears = date1Years - date2Years;

    var defaultValue: any = new Date('' + value).toLocaleDateString();

    const result = this.getResult(
      differenceSeconds,
      differenceMinutes,
      differenceHours,
      differenceDays,
      differenceMonths,
      differenceYears,
      defaultValue
    );

    // console.log('difference is', difference);
    // let time = new Date().getTime() - value.getTime();
    return result + ' ago';
  }

  getResult(
    seconds: number,
    minutes: number,
    hours: number,
    days: number,
    months: number,
    years: number,
    defaultValue: any
  ): string {
    seconds = Math.abs(seconds);
    minutes = Math.abs(minutes);
    hours = Math.abs(hours);
    days = Math.abs(days);
    months = Math.abs(months);
    years = Math.abs(years);
    // console.log('seconds===>>', seconds);
    // console.log('minutes===>>', minutes);
    // console.log('hours===>>', hours);
    // console.log('day===>>', days);
    // console.log('months===>>', months);
    // console.log('years===>>', years);

    // console.log('__________________________________________________________');
    if (
      seconds < 60 &&
      minutes <= 0 &&
      hours <= 0 &&
      days <= 0 &&
      months <= 0
    ) {
      return seconds < 9 ? '0' + seconds + ' sec.' : seconds + ' sec';
    } else if (minutes < 60 && hours <= 0 && days <= 0) {
      return minutes + ' min, ' + seconds + ' sec.';
    } else if (hours <= 24 && days <= 0 && months <= 0) {
      return hours <= 1 ? hours + 'hour' : hours + ' hours';
    } else if (days <= 7 && months <= 0) {
      return days <= 1 ? days + ' day' : days + ' days';
    } else if (months <= 12 && years <= 0) {
      return months <= 1 ? months + ' month' : months + ' months';
    } else {
      return defaultValue;
    }
  }
}
