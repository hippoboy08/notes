import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: string, fieldName?: string): any {
    if (value.length === 0) {
      return value
    }
    /* Remove highlighted tags before any processing*/
    value = value.map(item => {
      if (item[fieldName || 'content'].match(/<[^>]+>/gm))
        item[fieldName || 'content'] = item[fieldName || 'content'].replace(/<[^>]+>/gm, '')
      return item;
    })
    if (!input) {
      return value
    }
    /* Return the item which includes any word in the input string */
    const words = input.trim().split(' ')
    // console.log(words)
    return value.filter(item => {
      return words.some(word => item[fieldName || 'content'].toLowerCase().match(word.toLowerCase()))
    })
  }

}
