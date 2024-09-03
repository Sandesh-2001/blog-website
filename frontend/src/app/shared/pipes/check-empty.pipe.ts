import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkEmpty',
})
export class CheckEmptyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    console.log('from piep', '' + value.trim().length);
    if (value.trim().length === 0) {
      return false;
    }
    return value;
  }
}
