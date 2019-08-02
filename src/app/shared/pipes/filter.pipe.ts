import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: string, fieldName?: string): any {
    if(value.length === 0 || !input) {
      return value
    } else {
      return value.filter(item => {
        return item[fieldName || 'content'].includes(input);
      })
    }
  }

}
