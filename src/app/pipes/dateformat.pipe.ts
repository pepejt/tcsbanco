import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {

  transform(value: string, opt: number = 0): string {
    if(opt == 0) {
      var date = value.split('-');
      return date[2]+'/'+this.digitos(Number.parseInt(date[1]))+'/'+this.digitos(Number.parseInt(date[0]));
    }else {
      var date = value.split('/');
      return date[2]+'-'+this.digitos(Number.parseInt(date[1]))+'-'+this.digitos(Number.parseInt(date[0]));
    }
  }

  digitos(value: number){
    if (value >= 0 && value < 10) {
      return '0'+value;
    }
    return value;
  }

}
