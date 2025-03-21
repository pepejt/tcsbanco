import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {

  transform(value: string): string {
    var date = value.split('-');
    return date[2]+'/'+date[1]+'/'+date[0];
  }

}
