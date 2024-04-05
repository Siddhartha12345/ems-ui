import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobile'
})
export class MobilePipe implements PipeTransform {

  transform(value: string): string {

    const countryCode = "(+91)";
    const firstPair = value.substring(0, 2);
    const secondPair = value.substring(2, 6);
    const thirdPair = value.substring(6, 10);
    return `${countryCode} ${firstPair}-${secondPair}-${thirdPair}`;
  }

}
